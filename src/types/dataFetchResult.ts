export default interface FetchResult<T> {
    data: T | null;
    error: string | null;
    loading: boolean;
}