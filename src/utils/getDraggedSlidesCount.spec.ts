import { describe, it, expect } from 'vitest'

import { getDraggedSlidesCount } from './getDraggedSlidesCount'

describe('getDraggedSlidesCount', () => {
  it('should calculate the correct number of slides for horizontal drag', () => {
    const params = {
      isVertical: false,
      isReversed: false,
      dragged: { x: 150, y: 0 },
      effectiveSlideSize: 100,
      threshold: 0.5,
    }
    expect(getDraggedSlidesCount(params)).toBe(-2)
  })

  it('should calculate the correct number of slides for reversed horizontal drag', () => {
    const params = {
      isVertical: false,
      isReversed: true,
      dragged: { x: 150, y: 0 },
      effectiveSlideSize: 100,
      threshold: 0.5,
    }
    expect(getDraggedSlidesCount(params)).toBe(2)
  })

  it('should calculate the correct number of slides for reversed vertical drag', () => {
    const params = {
      isVertical: true,
      isReversed: true,
      dragged: { x: 0, y: 150 },
      effectiveSlideSize: 100,
      threshold: 0.5,
    }
    expect(getDraggedSlidesCount(params)).toBe(2)
  })

  it('should calculate the correct number of slides for vertical drag', () => {
    const params = {
      isVertical: true,
      isReversed: false,
      dragged: { x: 0, y: 150 },
      effectiveSlideSize: 100,
      threshold: 0.5,
    }
    expect(getDraggedSlidesCount(params)).toBe(-2)
  })

  it('should handle drag equal to the threshold', () => {
    const params = {
      isVertical: false,
      isReversed: false,
      dragged: { x: 50, y: 0 },
      effectiveSlideSize: 100,
      threshold: 0.5,
    };
    expect(getDraggedSlidesCount(params)).toBe(-1);
  });

  it('should handle reversed drag equal to the threshold', () => {
    const params = {
      isVertical: false,
      isReversed: true,
      dragged: { x: 50, y: 0 },
      effectiveSlideSize: 100,
      threshold: 0.5,
    };
    expect(getDraggedSlidesCount(params)).toBe(1);
  });

  it('should handle vertical drag equal to the threshold', () => {
    const params = {
      isVertical: true,
      isReversed: false,
      dragged: { x: 0, y: 50 },
      effectiveSlideSize: 100,
      threshold: 0.5,
    };
    expect(getDraggedSlidesCount(params)).toBe(-1);
  });

    it('should handle reversed vertical drag equal to the threshold', () => {
    const params = {
      isVertical: true,
      isReversed: true,
      dragged: { x: 0, y: 50 },
      effectiveSlideSize: 100,
      threshold: 0.5,
    };
    expect(getDraggedSlidesCount(params)).toBe(1);
  });

  it('should handle drag less than the threshold', () => {
    const params = {
      isVertical: false,
      isReversed: false,
      dragged: { x: 49, y: 0 },
      effectiveSlideSize: 100,
      threshold: 0.5,
    };
    expect(getDraggedSlidesCount(params)).toBe(0);
  });

    it('should handle reversed drag less than the threshold', () => {
    const params = {
      isVertical: false,
      isReversed: true,
      dragged: { x: 49, y: 0 },
      effectiveSlideSize: 100,
      threshold: 0.5,
    };
    expect(getDraggedSlidesCount(params)).toBe(0);
  });

  it('should handle vertical drag less than the threshold', () => {
    const params = {
      isVertical: true,
      isReversed: false,
      dragged: { x: 0, y: 49 },
      effectiveSlideSize: 100,
      threshold: 0.5,
    };
    expect(getDraggedSlidesCount(params)).toBe(0);
  });

    it('should handle reversed vertical drag less than the threshold', () => {
    const params = {
      isVertical: true,
      isReversed: true,
      dragged: { x: 0, y: 49 },
      effectiveSlideSize: 100,
      threshold: 0.5,
    };
    expect(getDraggedSlidesCount(params)).toBe(0);
  });

  it('should handle zero drag', () => {
    const params = {
      isVertical: false,
      isReversed: false,
      dragged: { x: 0, y: 0 },
      effectiveSlideSize: 100,
      threshold: 0.5,
    }
    expect(getDraggedSlidesCount(params)).toBe(0)
  })

  describe('carousel with no measurable size (#518)', () => {
    it('returns 0 when the effective slide size is 0 instead of Infinity', () => {
      const params = {
        isVertical: true,
        isReversed: false,
        dragged: { x: 0, y: 150 },
        effectiveSlideSize: 0,
        threshold: 0.5,
      }
      expect(getDraggedSlidesCount(params)).toBe(0)
    })

    it('returns 0 for a horizontal, reversed drag with a slide size of 0', () => {
      const params = {
        isVertical: false,
        isReversed: true,
        dragged: { x: -150, y: 0 },
        effectiveSlideSize: 0,
        threshold: 0.5,
      }
      expect(getDraggedSlidesCount(params)).toBe(0)
    })

    it('returns 0 for a negative or non-finite slide size', () => {
      const base = {
        isVertical: false,
        isReversed: false,
        dragged: { x: 150, y: 0 },
        threshold: 0.5,
      }
      expect(getDraggedSlidesCount({ ...base, effectiveSlideSize: -100 })).toBe(0)
      expect(getDraggedSlidesCount({ ...base, effectiveSlideSize: NaN })).toBe(0)
      expect(getDraggedSlidesCount({ ...base, effectiveSlideSize: Infinity })).toBe(0)
    })

    it('returns 0 for a non-finite drag distance', () => {
      const params = {
        isVertical: false,
        isReversed: false,
        dragged: { x: Infinity, y: 0 },
        effectiveSlideSize: 100,
        threshold: 0.5,
      }
      expect(getDraggedSlidesCount(params)).toBe(0)
    })
  })
})
