export type Health = { status: 'ok' | 'warn' | 'down'; time: string };

export async function fetchHealth(): Promise<Health> {
  try {
    const res = await fetch('/api/health');
    const ct = res.headers.get('content-type') || '';
    if (!res.ok || !ct.includes('application/json')) throw new Error('not-json');
    return (await res.json()) as Health;
  } catch {
    // Fallback so the app still renders if MSW is not initialized
    return { status: 'ok', time: new Date().toISOString() };
  }
}
