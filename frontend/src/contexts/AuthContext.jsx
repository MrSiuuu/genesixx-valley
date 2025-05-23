import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../services/supabase';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configuration d'axios avec l'URL de l'API
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Intercepteur pour ajouter le token d'authentification
  api.interceptors.request.use(async (config) => {
    const { data } = await supabase.auth.getSession();
    if (data?.session?.access_token) {
      config.headers.Authorization = `Bearer ${data.session.access_token}`;
    }
    return config;
  });

  useEffect(() => {
    async function loadUser() {
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Utiliser directement les données de l'utilisateur de Supabase
          // au lieu d'appeler l'API backend qui n'est pas disponible
          setUser({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.name || session.user.email
          });
        }
      } catch (err) {
        console.error("Erreur lors du chargement de l'utilisateur:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUser();

    // Écouter les changements d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Vérifier si l'utilisateur a un pays défini
          const hasCountry = session.user.user_metadata?.country;
          
          // Vérifier si c'est une première connexion avec Google
          const isGoogleUser = session.user.app_metadata?.provider === 'google';
          const isNewUser = session.user.app_metadata?.created_at === session.user.app_metadata?.confirmed_at;
          
          // Définir l'utilisateur dans le state
          setUser({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.name || session.user.email,
            country: session.user.user_metadata?.country,
            isNewGoogleUser: isGoogleUser && isNewUser && !hasCountry
          });
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setUser({
        ...data.user,
        token: data.user.access_token
      });
      
      return data;
    } catch (err) {
      console.error('Erreur de connexion:', err.message);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, name) => {
    setLoading(true);
    setError(null);
    console.log('Tentative d\'inscription avec:', { email, password, name });
    
    try {
      // Première étape : inscription
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      console.log('Réponse de Supabase signUp:', { data, error });

      if (error) throw error;
      
      // Si l'utilisateur est créé mais pas confirmé, on le connecte quand même en développement
      if (data?.user) {
        // Connexion automatique après inscription
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (signInError) {
          console.log('Erreur lors de la connexion automatique:', signInError);
          // On ne lance pas d'erreur ici, car l'inscription a réussi
          // On informe simplement l'utilisateur qu'il doit confirmer son email
          setError("Votre compte a été créé. Veuillez vérifier votre email pour confirmer votre inscription.");
          return data;
        }
        
        setUser({
          id: signInData.user.id,
          email: signInData.user.email,
          name: signInData.user.user_metadata?.name || signInData.user.email
        });
      }
      
      return data;
    } catch (err) {
      console.error('Erreur détaillée:', err);
      
      // Messages d'erreur plus spécifiques
      if (err.message.includes('email')) {
        setError("L'adresse email n'est pas valide ou est déjà utilisée");
      } else if (err.message.includes('password')) {
        setError("Le mot de passe doit contenir au moins 6 caractères");
      } else if (err.message.includes('confirmed')) {
        // Si l'erreur concerne la confirmation de l'email
        setError("Votre compte a été créé. Veuillez vérifier votre email pour confirmer votre inscription.");
      } else {
        setError(err.message);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (err) {
      console.error('Erreur de déconnexion:', err.message);
      setError(err.message);
      throw err;
    }
  };

  const checkUser = async (session) => {
    if (!session) return null;
    
    try {
      // Vérifier si l'utilisateur existe déjà dans la table profiles
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Erreur lors de la vérification du profil:', profileError);
        return null;
      }
      
      // Si l'utilisateur n'existe pas dans profiles, le créer
      if (!profile) {
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([
            {
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata?.full_name || session.user.email,
              email_confirmed: session.user.email_confirmed || true, // Les utilisateurs Google ont déjà un email confirmé
              created_at: new Date().toISOString(),
            },
          ]);
        
        if (insertError) {
          console.error('Erreur lors de la création du profil:', insertError);
          return null;
        }
        
        // Récupérer le profil nouvellement créé
        const { data: newProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        return {
          ...session.user,
          ...newProfile,
        };
      }
      
      // Retourner l'utilisateur avec les données du profil
      return {
        ...session.user,
        ...profile,
      };
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'utilisateur:', error);
      return null;
    }
  };

  const updateUser = async (userData) => {
    try {
      setLoading(true);
      
      // Mettre à jour les métadonnées utilisateur dans Supabase
      const { error } = await supabase.auth.updateUser({
        data: userData
      });
      
      if (error) throw error;
      
      // Mettre à jour l'état local
      setUser(prevUser => ({
        ...prevUser,
        ...userData
      }));
      
      return true;
    } catch (err) {
      console.error('Erreur lors de la mise à jour du profil:', err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 