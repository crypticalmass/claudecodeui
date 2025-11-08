import express from 'express';
import { settingsDb } from '../database/db.js';

const router = express.Router();

// Get all settings for the current user
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const settings = settingsDb.getAllSettings(userId);
    res.json(settings);
  } catch (error) {
    console.error('Error getting settings:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get a specific setting
router.get('/:key', async (req, res) => {
  try {
    const userId = req.user.id;
    const { key } = req.params;
    const value = settingsDb.getSetting(userId, key);
    res.json({ key, value });
  } catch (error) {
    console.error('Error getting setting:', error);
    res.status(500).json({ error: error.message });
  }
});

// Save a setting
router.post('/:key', async (req, res) => {
  try {
    const userId = req.user.id;
    const { key } = req.params;
    const { value } = req.body;
    
    if (value === undefined) {
      return res.status(400).json({ error: 'Value is required' });
    }
    
    settingsDb.saveSetting(userId, key, value);
    res.json({ success: true, key, value });
  } catch (error) {
    console.error('Error saving setting:', error);
    res.status(500).json({ error: error.message });
  }
});

// Save multiple settings at once
router.post('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const settings = req.body;
    
    if (!settings || typeof settings !== 'object') {
      return res.status(400).json({ error: 'Settings object is required' });
    }
    
    for (const [key, value] of Object.entries(settings)) {
      settingsDb.saveSetting(userId, key, value);
    }
    
    res.json({ success: true, saved: Object.keys(settings).length });
  } catch (error) {
    console.error('Error saving settings:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a setting
router.delete('/:key', async (req, res) => {
  try {
    const userId = req.user.id;
    const { key } = req.params;
    const deleted = settingsDb.deleteSetting(userId, key);
    res.json({ success: deleted });
  } catch (error) {
    console.error('Error deleting setting:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

