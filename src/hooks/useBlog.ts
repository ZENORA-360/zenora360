import { useCallback, useEffect, useRef } from 'react';
import { useBlogStore } from '@/stores/blogStore';
import api from '@/lib/axios';
import { BlogPost, BlogFormData, BlogFilters, ConnectionStatus } from '@/types/blog';

// Mock data for development (simulates API response)
const mockPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'transformation-digitale-afrique-2024',
    title: 'La Transformation Digitale en Afrique : Tendances 2024',
    titleEn: 'Digital Transformation in Africa: 2024 Trends',
    excerpt: 'Découvrez les principales tendances qui façonnent le paysage numérique africain cette année.',
    excerptEn: 'Discover the main trends shaping the African digital landscape this year.',
    content: `<h2>Introduction</h2><p>L'Afrique connaît une révolution numérique sans précédent. En 2024, plusieurs tendances majeures redéfinissent le paysage technologique du continent.</p><h2>1. L'essor du Mobile Banking</h2><p>Le mobile money continue sa progression fulgurante, avec plus de 500 millions d'utilisateurs actifs sur le continent.</p><h2>2. L'Intelligence Artificielle</h2><p>Les startups africaines adoptent massivement l'IA pour résoudre des problèmes locaux.</p>`,
    contentEn: `<h2>Introduction</h2><p>Africa is experiencing an unprecedented digital revolution. In 2024, several major trends are redefining the continent's technological landscape.</p><h2>1. The Rise of Mobile Banking</h2><p>Mobile money continues its meteoric rise, with over 500 million active users on the continent.</p><h2>2. Artificial Intelligence</h2><p>African startups are massively adopting AI to solve local problems.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
    author: { name: 'ZENORA Team', avatar: '' },
    category: 'Technologie',
    categoryEn: 'Technology',
    tags: ['Digital', 'Afrique', 'Innovation'],
    tagsEn: ['Digital', 'Africa', 'Innovation'],
    publishedAt: '2024-01-15T10:00:00Z',
    readingTime: 5,
    isPublished: true,
  },
  {
    id: '2',
    slug: 'strategies-marketing-digital-pme',
    title: 'Stratégies de Marketing Digital pour les PME',
    titleEn: 'Digital Marketing Strategies for SMEs',
    excerpt: 'Les meilleures pratiques pour développer votre présence en ligne avec un budget limité.',
    excerptEn: 'Best practices to develop your online presence with a limited budget.',
    content: `<h2>Maximiser votre ROI</h2><p>Pour les PME, chaque franc investi doit compter. Voici comment optimiser votre stratégie digitale.</p>`,
    contentEn: `<h2>Maximize your ROI</h2><p>For SMEs, every franc invested must count. Here's how to optimize your digital strategy.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
    author: { name: 'ZENORA Team', avatar: '' },
    category: 'Marketing',
    categoryEn: 'Marketing',
    tags: ['Marketing', 'PME', 'Digital'],
    tagsEn: ['Marketing', 'SME', 'Digital'],
    publishedAt: '2024-01-10T10:00:00Z',
    readingTime: 7,
    isPublished: true,
  },
  {
    id: '3',
    slug: 'ux-design-applications-mobiles',
    title: 'UX Design : Créer des Applications Mobiles Irrésistibles',
    titleEn: 'UX Design: Creating Irresistible Mobile Apps',
    excerpt: 'Les principes fondamentaux pour concevoir des expériences utilisateur mémorables.',
    excerptEn: 'Fundamental principles for designing memorable user experiences.',
    content: `<h2>L'importance de l'UX</h2><p>Une bonne expérience utilisateur peut faire la différence entre le succès et l'échec d'une application.</p>`,
    contentEn: `<h2>The Importance of UX</h2><p>A good user experience can make the difference between the success and failure of an application.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200',
    author: { name: 'ZENORA Team', avatar: '' },
    category: 'Design',
    categoryEn: 'Design',
    tags: ['UX', 'Design', 'Mobile'],
    tagsEn: ['UX', 'Design', 'Mobile'],
    publishedAt: '2024-01-05T10:00:00Z',
    readingTime: 6,
    isPublished: true,
  },
  {
    id: '4',
    slug: 'erp-transformation-entreprises',
    title: 'Comment l\'ERP Transforme les Entreprises Africaines',
    titleEn: 'How ERP Transforms African Businesses',
    excerpt: 'L\'intégration des systèmes ERP pour une gestion optimisée de votre entreprise.',
    excerptEn: 'ERP systems integration for optimized business management.',
    content: `<h2>Pourquoi adopter un ERP ?</h2><p>Les entreprises africaines qui adoptent des solutions ERP voient leur productivité augmenter de 30% en moyenne.</p>`,
    contentEn: `<h2>Why adopt an ERP?</h2><p>African companies that adopt ERP solutions see their productivity increase by 30% on average.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200',
    author: { name: 'ZENORA Team', avatar: '' },
    category: 'Solutions Métiers',
    categoryEn: 'Business Solutions',
    tags: ['ERP', 'Business', 'Gestion'],
    tagsEn: ['ERP', 'Business', 'Management'],
    publishedAt: '2024-01-01T10:00:00Z',
    readingTime: 8,
    isPublished: true,
  },
  {
    id: '5',
    slug: 'cybersecurite-bonnes-pratiques',
    title: 'Cybersécurité : Les Bonnes Pratiques pour Protéger votre Entreprise',
    titleEn: 'Cybersecurity: Best Practices to Protect Your Business',
    excerpt: 'Guide complet pour sécuriser vos données et systèmes contre les cybermenaces.',
    excerptEn: 'Complete guide to securing your data and systems against cyber threats.',
    content: `<h2>La menace grandissante</h2><p>Les cyberattaques ont augmenté de 300% en Afrique ces dernières années.</p>`,
    contentEn: `<h2>The Growing Threat</h2><p>Cyberattacks have increased by 300% in Africa in recent years.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200',
    author: { name: 'ZENORA Team', avatar: '' },
    category: 'Sécurité',
    categoryEn: 'Security',
    tags: ['Sécurité', 'Cybersécurité', 'Protection'],
    tagsEn: ['Security', 'Cybersecurity', 'Protection'],
    publishedAt: '2023-12-28T10:00:00Z',
    readingTime: 10,
    isPublished: true,
  },
  {
    id: '6',
    slug: 'e-commerce-afrique-opportunites',
    title: 'E-commerce en Afrique : Les Opportunités à Saisir',
    titleEn: 'E-commerce in Africa: Opportunities to Seize',
    excerpt: 'Le marché du e-commerce africain en pleine expansion offre des opportunités uniques.',
    excerptEn: 'The expanding African e-commerce market offers unique opportunities.',
    content: `<h2>Un marché en croissance</h2><p>Le e-commerce africain devrait atteindre 75 milliards de dollars d'ici 2025.</p>`,
    contentEn: `<h2>A Growing Market</h2><p>African e-commerce is expected to reach $75 billion by 2025.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200',
    author: { name: 'ZENORA Team', avatar: '' },
    category: 'E-commerce',
    categoryEn: 'E-commerce',
    tags: ['E-commerce', 'Business', 'Afrique'],
    tagsEn: ['E-commerce', 'Business', 'Africa'],
    publishedAt: '2023-12-20T10:00:00Z',
    readingTime: 6,
    isPublished: true,
  },
];

const simulateDelay = (ms: number = 800) =>
  new Promise(resolve => setTimeout(resolve, ms));

const checkConnectionSpeed = (): ConnectionStatus => {
  const connection = (navigator as any).connection;
  if (!navigator.onLine) return 'offline';
  if (connection) {
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return 'slow';
    }
  }
  return 'online';
};

export const useBlog = () => {
  // Use individual selectors to avoid infinite re-render loops
  const posts = useBlogStore(s => s.posts);
  const currentPost = useBlogStore(s => s.currentPost);
  const isLoading = useBlogStore(s => s.isLoading);
  const isLoadingMore = useBlogStore(s => s.isLoadingMore);
  const error = useBlogStore(s => s.error);
  const connectionStatus = useBlogStore(s => s.connectionStatus);
  const currentPage = useBlogStore(s => s.currentPage);
  const totalPages = useBlogStore(s => s.totalPages);
  const totalPosts = useBlogStore(s => s.totalPosts);
  const limit = useBlogStore(s => s.limit);
  const filters = useBlogStore(s => s.filters);

  // Get actions (these are stable references in zustand)
  const setPosts = useBlogStore(s => s.setPosts);
  const appendPosts = useBlogStore(s => s.appendPosts);
  const setCurrentPost = useBlogStore(s => s.setCurrentPost);
  const addPost = useBlogStore(s => s.addPost);
  const storeUpdatePost = useBlogStore(s => s.updatePost);
  const storeDeletePost = useBlogStore(s => s.deletePost);
  const setLoading = useBlogStore(s => s.setLoading);
  const setLoadingMore = useBlogStore(s => s.setLoadingMore);
  const setError = useBlogStore(s => s.setError);
  const setConnectionStatus = useBlogStore(s => s.setConnectionStatus);
  const setFilters = useBlogStore(s => s.setFilters);
  const clearCache = useBlogStore(s => s.clearCache);
  const isCacheValid = useBlogStore(s => s.isCacheValid);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Monitor connection status
  useEffect(() => {
    const update = () => setConnectionStatus(checkConnectionSpeed());
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    update();
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, [setConnectionStatus]);

  const lastFiltersRef = useRef<string>('');

  const fetchPosts = useCallback(async (requestFilters?: BlogFilters, forceRefresh = false) => {
    const filtersKey = JSON.stringify(requestFilters || {});
    const filtersChanged = filtersKey !== lastFiltersRef.current;
    
    if (!forceRefresh && !filtersChanged && isCacheValid() && posts.length > 0) return;
    lastFiltersRef.current = filtersKey;

    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/blogs', {
        params: {
          page: requestFilters?.page || 1,
          limit: requestFilters?.limit || limit,
          category: requestFilters?.category,
          search: requestFilters?.search,
        },
        signal: abortControllerRef.current.signal,
      });
      const { data, total, page, totalPages: tp } = response.data;
      setPosts(data, total, page, tp);
    } catch (err: any) {
      if (err.name === 'CanceledError') return;
      console.log('API unavailable, using mock data');
      await simulateDelay(400);

      // Use store posts (includes admin-created ones) + mock posts as base
      const storePosts = useBlogStore.getState().posts;
      const allPosts = [...mockPosts];
      // Merge store posts that aren't in mockPosts
      storePosts.forEach(sp => {
        if (!allPosts.find(mp => mp.id === sp.id)) {
          allPosts.unshift(sp);
        }
      });

      let filtered = [...allPosts];
      if (requestFilters?.category) {
        filtered = filtered.filter(p => p.category.toLowerCase() === requestFilters.category!.toLowerCase());
      }
      if (requestFilters?.search) {
        const s = requestFilters.search.toLowerCase();
        filtered = filtered.filter(p =>
          p.title.toLowerCase().includes(s) ||
          p.excerpt.toLowerCase().includes(s) ||
          (p.titleEn && p.titleEn.toLowerCase().includes(s)) ||
          (p.excerptEn && p.excerptEn.toLowerCase().includes(s))
        );
      }
      filtered = filtered.filter(p => p.isPublished);

      const pg = requestFilters?.page || 1;
      const lm = requestFilters?.limit || limit;
      const start = (pg - 1) * lm;
      const paginated = filtered.slice(start, start + lm);
      setPosts(paginated, filtered.length, pg, Math.ceil(filtered.length / lm));
    } finally {
      setLoading(false);
    }
  }, [posts.length, limit, isCacheValid, setPosts, setLoading, setError]);

  const loadMorePosts = useCallback(async () => {
    if (isLoadingMore || currentPage >= totalPages) return;
    setLoadingMore(true);
    try {
      const response = await api.get('/blogs', { params: { page: currentPage + 1, limit, ...filters } });
      appendPosts(response.data.data);
    } catch {
      await simulateDelay();
      const nextPage = currentPage + 1;
      const start = (nextPage - 1) * limit;
      const newPosts = mockPosts.filter(p => p.isPublished).slice(start, start + limit);
      if (newPosts.length > 0) appendPosts(newPosts);
    } finally {
      setLoadingMore(false);
    }
  }, [isLoadingMore, currentPage, totalPages, limit, filters, appendPosts, setLoadingMore]);

  const fetchPostBySlug = useCallback(async (slug: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/blog/${slug}`);
      setCurrentPost(response.data);
      return response.data;
    } catch {
      await simulateDelay();
      const post = mockPosts.find(p => p.slug === slug);
      if (post) { setCurrentPost(post); return post; }
      else { setError('Article non trouvé'); return null; }
    } finally {
      setLoading(false);
    }
  }, [setCurrentPost, setLoading, setError]);

  const fetchAllPostsAdmin = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/admin/blogs');
      const data = response.data.data || response.data;
      setPosts(data, data.length, 1, 1);
      return data;
    } catch {
      await simulateDelay();
      setPosts(mockPosts, mockPosts.length, 1, 1);
      return mockPosts;
    } finally {
      setLoading(false);
    }
  }, [setPosts, setLoading, setError]);

  const createPost = useCallback(async (data: BlogFormData): Promise<BlogPost | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/admin/blogs', data);
      addPost(response.data);
      return response.data;
    } catch {
      await simulateDelay();
      const newPost: BlogPost = {
        id: String(Date.now()),
        slug: data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        ...data,
        author: { name: 'ZENORA Team' },
        publishedAt: new Date().toISOString(),
        readingTime: Math.ceil(data.content.split(' ').length / 200),
      };
      addPost(newPost);
      return newPost;
    } finally {
      setLoading(false);
    }
  }, [addPost, setLoading, setError]);

  const updatePost = useCallback(async (id: string, data: Partial<BlogFormData>): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await api.put(`/admin/blogs/${id}`, data);
      storeUpdatePost(id, { ...data, updatedAt: new Date().toISOString() });
      return true;
    } catch {
      await simulateDelay();
      storeUpdatePost(id, { ...data, updatedAt: new Date().toISOString() });
      return true;
    } finally {
      setLoading(false);
    }
  }, [storeUpdatePost, setLoading, setError]);

  const deletePost = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/admin/blogs/${id}`);
      storeDeletePost(id);
      return true;
    } catch {
      await simulateDelay();
      storeDeletePost(id);
      return true;
    } finally {
      setLoading(false);
    }
  }, [storeDeletePost, setLoading, setError]);

  const togglePublish = useCallback(async (id: string, isPublished: boolean): Promise<boolean> => {
    return updatePost(id, { isPublished });
  }, [updatePost]);

  return {
    posts, currentPost, isLoading, isLoadingMore, error, connectionStatus,
    currentPage, totalPages, totalPosts,
    hasMore: currentPage < totalPages,
    fetchPosts, loadMorePosts, fetchPostBySlug, fetchAllPostsAdmin,
    createPost, updatePost, deletePost, togglePublish,
    setFilters, clearCache,
  };
};
