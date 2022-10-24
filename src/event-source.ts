import { fromEvent, merge, Observable, of } from 'rxjs';
import { map, finalize, takeUntil, switchMap, filter } from 'rxjs/operators';

export interface EventSourceOptions<TData = unknown> {
  /**
   * Event types to subscribe to.
   * @default ['message']
   */
  eventTypes?: Array<string>;
  /**
   * Function to parse messages.
   * @default (_, message) => JSON.parse(message)
   */
  parseFn?: (eventType: string, message: string) => TData;
  /**
   * A list of allowed origins.
   * If set, messages from origins not listed are blocked.
   */
  allowedOrigins?: Array<string>;
}

/**
 * Takes EventSource and creates an observable from it.
 *
 * @example
 * ```ts
 * const sse = new EventSource(url, configuration);
 * const options = {
 *   // ...
 * };
 * return fromEventSource(sse, options).pipe(
 *   finalize(() => {
 *     // Make sure the EventSource is closed once not needed.
 *     sse.close();
 *   }),
 * );
 * ```
 */
export function fromEventSource<TData = unknown>(
  sse: EventSource,
  options?: EventSourceOptions<TData>
): Observable<TData> {
  const defaultOptions: EventSourceOptions<TData> = {
    eventTypes: ['message'],
    parseFn: (_, message) => JSON.parse(message),
  };
  const { eventTypes, parseFn, allowedOrigins } = {
    ...defaultOptions,
    ...(options || {}),
  };

  const events$ = eventTypes.map((eventType) =>
    fromEvent<MessageEvent>(sse, eventType).pipe(
      filter(
        (event) => !allowedOrigins || allowedOrigins.includes(event.origin)
      ),
      map((event) => parseFn(eventType, event.data))
    )
  );
  const error$ = fromEvent<Event>(sse, 'error').pipe(
    map((event) => {
      const sse =
        event.target instanceof EventSource ? event.target : undefined;
      throw new Error(
        `An error occurred while attempting to connect${
          sse?.url ? `: ${sse.url}` : '.'
        }`
      );
    })
  );
  const complete$ = fromEvent(sse, 'complete');

  return merge(...events$, error$).pipe(takeUntil(complete$));
}

/**
 * Creates event source from url (and config) and returns an observable with
 * parsed event source data.
 * Opens the event source once subscribed.
 * Closes the event source, once unsubscribed.
 *
 * @example
 * ```ts
 * const options = {
 *   // ...
 * };
 * const sse$ = eventSource$(
 *   'https://example.com/sse',
 *   { withCredentials: false }, // or true
 *   options
 * );
 * sse$.subscribe((data) => {
 *   console.log(data);
 * });
 * ```
 */
export function eventSource$<TData = unknown>(
  url: string,
  configuration?: EventSourceInit,
  options?: EventSourceOptions<TData>
): Observable<TData> {
  return of({ url, configuration }).pipe(
    switchMap(({ url, configuration }) => {
      const sse = new EventSource(url, configuration);
      return fromEventSource<TData>(sse, options).pipe(
        finalize(() => {
          sse.close();
        })
      );
    })
  );
}
