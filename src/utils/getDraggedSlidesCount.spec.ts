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
})
