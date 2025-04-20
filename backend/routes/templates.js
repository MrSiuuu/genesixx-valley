router.get('/search', async (req, res) => {
  try {
    const { query, category } = req.query;
    
    let filter = {};
    
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { keywords: { $regex: query, $options: 'i' } }
      ];
    }
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    const templates = await Template.find(filter);
    
    res.json(templates);
  } catch (error) {
    console.error('Error searching templates:', error);
    res.status(500).json({ message: 'Server error' });
  }
}); 