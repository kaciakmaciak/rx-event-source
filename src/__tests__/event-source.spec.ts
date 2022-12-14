import { firstValueFrom, of } from 'rxjs';
import { catchError, map, take, toArray } from 'rxjs/operators';

import { eventSource$ } from '../event-source';

import { server } from '../__api-mocks__/server';

describe('EventSource helpers', () => {
  let closeSseSpy: jest.SpyInstance;

  beforeEach(() => {
    closeSseSpy = jest.spyOn(global.EventSource.prototype, 'close');
  });

  afterEach(() => {
    closeSseSpy?.mockRestore();
  });

  const requestListener = jest.fn();

  beforeEach(() => {
    server.events.on('request:start', requestListener);
  });

  afterEach(() => {
    server.events.removeListener('request:start', requestListener);
    requestListener.mockClear();
  });

  function createAbsoluteUrl(relativePath: string): string {
    return new URL(relativePath, window.location.href).toString();
  }

  describe('eventSource$', () => {
    it('should emit values from event source', async () => {
      const sse$ = eventSource$(createAbsoluteUrl('/sse'));
      expect(await firstValueFrom(sse$.pipe(take(5), toArray())))
        .toMatchInlineSnapshot(`
        Array [
          "hello",
          "world",
          123,
          "green",
          Object {
            "test": "red",
          },
        ]
      `);
    });

    it('should not open the EventSource until subscribed', async () => {
      const sse$ = eventSource$(createAbsoluteUrl('/sse'));
      expect(requestListener).not.toHaveBeenCalled();

      const promise = firstValueFrom(sse$.pipe(take(5), toArray()));
      expect(requestListener).toHaveBeenCalledTimes(1);

      await promise;
    });

    it('should close the EventSource once unsubscribed', async () => {
      const sse$ = eventSource$(createAbsoluteUrl('/sse'));
      await firstValueFrom(sse$.pipe(take(5), toArray()));

      expect(closeSseSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit values from event source until error', async () => {
      const sse$ = eventSource$(createAbsoluteUrl('/sse/error')).pipe(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        map((data: any) => {
          if (data.type === 'error') {
            throw new Error(data.data);
          }
          return data;
        })
      );
      expect(
        await firstValueFrom(
          sse$.pipe(
            take(5),
            catchError((error) => of(new Error(error.message))),
            toArray()
          )
        )
      ).toMatchInlineSnapshot(`
        Array [
          "hello",
          "world",
          123,
          [Error: Test Error],
        ]
      `);
    });

    it('should fail to subscribe', async () => {
      expect.assertions(2);
      const sse$ = eventSource$(createAbsoluteUrl('/sse/network-error'));
      try {
        await firstValueFrom(sse$.pipe(take(5), toArray()));
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error?.message).toMatchInlineSnapshot(
          `"An error occurred while attempting to connect."`
        );
      }
    });

    describe('options', () => {
      describe('allowedOrigins', () => {
        it('should not block message from localhost', async () => {
          const sse$ = eventSource$(createAbsoluteUrl('/sse'), undefined, {
            allowedOrigins: ['http://localhost'],
          });
          expect(
            (await firstValueFrom(sse$.pipe(take(5), toArray()))).length
          ).toBeGreaterThan(0);
        });

        it('should block messages from localhost', async () => {
          const sse$ = eventSource$(createAbsoluteUrl('/sse'), undefined, {
            allowedOrigins: ['https://this-is-not-localhost.com'],
          });
          expect(
            await firstValueFrom(sse$.pipe(take(5), toArray()))
          ).toHaveLength(0);
        });
      });
    });
  });
});
