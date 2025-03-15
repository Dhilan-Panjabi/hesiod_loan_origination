import { createClient } from '@supabase/supabase-js';

// Supabase setup
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

// Validate configuration
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication functions
export const auth = {
  // Sign up a new user
  signUp: async (email: string, password: string, userData: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });
    return { data, error };
  },

  // Sign in an existing user
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // Sign out the current user
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Get the current user
  getCurrentUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    return { data, error };
  },

  // Get the current session
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    return { data, error };
  },

  // Reset password
  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    return { data, error };
  },
};

// Database operations
export const db = {
  // Create a record
  create: async (tableName: string, data: any) => {
    const { data: result, error } = await supabase
      .from(tableName)
      .insert(data)
      .select();
    return { data: result, error };
  },

  // Read records with optional filters
  read: async (tableName: string, query: any = {}) => {
    let queryBuilder = supabase.from(tableName).select(query.select || '*');

    if (query.filters) {
      query.filters.forEach((filter: any) => {
        queryBuilder = queryBuilder.filter(
          filter.column,
          filter.operator,
          filter.value
        );
      });
    }

    if (query.order) {
      queryBuilder = queryBuilder.order(query.order.column, {
        ascending: query.order.ascending,
      });
    }

    if (query.limit) {
      queryBuilder = queryBuilder.limit(query.limit);
    }

    const { data, error } = await queryBuilder;
    return { data, error };
  },

  // Update a record
  update: async (tableName: string, id: string, data: any) => {
    const { data: result, error } = await supabase
      .from(tableName)
      .update(data)
      .eq('id', id)
      .select();
    return { data: result, error };
  },

  // Delete a record
  delete: async (tableName: string, id: string) => {
    const { data, error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);
    return { data, error };
  },
};

// Storage operations
export const storage = {
  // Upload a file
  upload: async (bucket: string, path: string, file: File) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });
    return { data, error };
  },

  // Download a file
  download: async (bucket: string, path: string) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(path);
    return { data, error };
  },

  // Get a public URL for a file
  getPublicUrl: (bucket: string, path: string) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  },

  // Delete a file
  delete: async (bucket: string, paths: string[]) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove(paths);
    return { data, error };
  },
};

export default { auth, db, storage }; 