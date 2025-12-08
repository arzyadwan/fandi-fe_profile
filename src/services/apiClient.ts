// src/services/apiClient.ts
import axios from 'axios';
import type { Article, Category, Tag } from '../types/types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = `${BASE_URL}/api`;


// Antarmuka baru untuk respons paginasi
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Fungsi baru untuk mengambil artikel dengan paginasi
export const getPaginatedArticles = async (url: string): Promise<PaginatedResponse<Article>> => {
  // url akan menjadi seperti '/articles/?page=2' atau '/articles/?search=...'
  // kita gunakan URL lengkap agar lebih fleksibel
  try {
    const response = await axios.get(`${API_BASE_URL}${url}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching paginated articles:', error);
    // Mengembalikan struktur default jika error
    return { count: 0, next: null, previous: null, results: [] };
  }
};

export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/articles/${slug}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    return null;
  }
};

export const getLatestArticles = async (): Promise<Article[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/articles/latest/`); // Pastikan ini
    return response.data;
  } catch (error) {
    console.error('Error fetching latest articles:', error);
    return [];
  }
};

export const getPaginatedCategories = async (): Promise<PaginatedResponse<Category>> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { count: 0, next: null, previous: null, results: [] };
  }
};

export const getPaginatedTags = async (): Promise<PaginatedResponse<Tag>> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tags/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    return { count: 0, next: null, previous: null, results: [] };
  }
};