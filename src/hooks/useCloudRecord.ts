import { useSharedState, type HotelStateKey } from '@/lib/hotel-sync';

/**
 * Cross-browser/cross-IP record map, keyed by booking id (or room number).
 * Built on top of the same hotel_app_state + realtime + CAS engine that
 * already syncs bookings/grid — so it's proven infra, not a new path.
 */
export function useCloudRecord<T>(key: HotelStateKey) {
  const { data, setData, ready } = useSharedState<Record<string, T>>(key, {});
  const records = data ?? {};

  const updateRecord = (id: string, value: T) => {
    setData((prev) => ({ ...(prev ?? {}), [id]: value }));
  };

  return { records, updateRecord, ready } as const;
}