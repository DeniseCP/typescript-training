import { TestBed } from '@angular/core/testing';

import { SortService } from './sort.service';

describe('SortService', () => {
  let service: SortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('it should test if algorithm works in different scenarios', () => {
    it('tests an unsorted array', () => {
      let unsorted = [3, 4, 1];
      service.bubbleSort(unsorted).pipe().subscribe(
        (sorted) => {
          expect(sorted).toEqual([1, 3, 4]);
        }
      );
    });

    it('tests an empty array', () => {
      let unsorted: number[] = [];
      service.bubbleSort(unsorted).pipe().subscribe(
        (sorted) => {
          expect(sorted).toEqual([]);
        });
    });

    it('tests an array with one item', () => {
      let unsorted = [1];
      service.bubbleSort(unsorted).pipe().subscribe(
        (sorted) => {
          expect(sorted).toEqual([1]);
        }
      );
    });

    it('tests an array with negative numbers', () => {
      service.bubbleSort([-1, -2, -3]).pipe().subscribe(
        (sorted) => {
          expect(sorted).toEqual([-3, -2, -1]);
        }
      );
    });

    it('tests an array with repeated numbers', () => {
      service.bubbleSort([1, 1, 1]).pipe().subscribe(
        (sorted) => {
          expect(sorted).toEqual([1, 1, 1]);
        });
    });

    it('tests an array with decimal numbers', () => {
      service.bubbleSort([1.1, 1.2, 1.3]).pipe().subscribe(
        (sorted) => {
          expect(sorted).toEqual([1.1, 1.2, 1.3]);
        }
      );
    });

    it('should throw an error if input is not an array of numbers', (done) => {
      // Create an observable that will throw an error
      // @ts-ignore
      service.bubbleSort(['1', '2', '3']).subscribe({
        next: (_n) => {
          // This block should not be executed for this test
          expect(true).toBe(false);
          done();
        },
        error: (error) => {
          // Expect an error with the specified message
          expect(error).toEqual('Invalid input.');
          done(); // Call done() to signal completion of the async test
        }
      });
    });

  });
});
