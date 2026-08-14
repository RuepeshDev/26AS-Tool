import { createClient } from '@supabase/supabase-js';

// Retrieve environment credentials or use fallback setup placeholders
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Record execution metrics to Supabase execution_stats table.
 * Currently set up as requested without real posting execution in production flows.
 */
export async function recordExecutionStats({ sessionId, totalSuccessful, totalFailed, disposedTimeSeconds }) {
    try {
        console.log('[Supabase Setup] Preparing to log stats:', {
            sessionId,
            totalSuccessful,
            totalFailed,
            disposedTimeSeconds
        });

        // Placeholder setup for Supabase save operation:
        // const { data, error } = await supabase
        //     .from('execution_stats')
        //     .insert([
        //         {
        //             session_id: sessionId,
        //             total_successful: totalSuccessful,
        //             total_failed: totalFailed,
        //             disposed_time_seconds: disposedTimeSeconds
        //         }
        //     ]);
        // if (error) console.error('[Supabase Error]', error);
        // return data;

        return { status: 'initialized', mockSaved: true };
    } catch (err) {
        console.warn('[Supabase Setup Warning] Supabase metrics capture deferred:', err);
        return null;
    }
}
