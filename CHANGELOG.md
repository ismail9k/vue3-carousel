# Changelog

All notable changes to this project will be documented in this file.

## [0.8.0](https://github.com/ismail9k/vue3-carousel/releases/tag/v0.8.0) - 2024-11-24

- fix: invalid type for prop height by @aovcina in #425
- Feat support enable disable carousel by @ismail9k in #426
  
## [0.7.1](https://github.com/ismail9k/vue3-carousel/releases/tag/v0.7.1) - 2024-11-17

- Feat support vertical slides by n #423
- Feat support config carousel height
- Fix assets build

## [0.7.0](https://github.com/ismail9k/vue3-carousel/releases/tag/v0.7.0) - 2024-11-17

- Feat: support vertical slides in #423

## [0.6.0](https://github.com/ismail9k/vue3-carousel/releases/tag/v0.6.0) - 2024-11-15

- Feat(utils): use requestAnimationFrame for throttle function in #422
- Feat: support slides gap in #421
- Feat(config): remove throttle value
- Refactor(getMinSlideIndex): to use object instead of switch..case for clarity and maintainability
- Refactor(getMaxSlideIndex): to use object instead of switch..case for clarity and maintainability

## [0.5.1](https://github.com/ismail9k/vue3-carousel/releases/tag/v0.5.1) - 2024-11-06

- Test: use vitest instead of jest in #418
- Feat add title attribute for pagination and navigation buttons in #419

## [0.5.0](https://github.com/ismail9k/vue3-carousel/releases/tag/v0.5.0) - 2024-10-23

- Feat: Support Ability to Breakpoints Relative to The Carousel Width by @tarwin, @ismail9k in #408
- Fix infinite recursion in mapNumberToRange by @Tofandel in #415

## [0.4.0](https://github.com/ismail9k/vue3-carousel/releases/tag/v0.4.0) - 2024-10-23

- feat: Stop using Capture phase events (#398) @coofercat
- chore: Export all types (#397) @Tofandel
- fix: Properly prevent click on drag finished (#396) @Tofandel
- docs: update pagination example code to match the component (#395) @Tofandel
- docs: update vitepress to version 1.3.4
- feat: improvements in generating default config

## [0.3.4](https://github.com/ismail9k/vue3-carousel/releases/tag/v0.3.4) - 2024-04-02

- Full support for esm (#373) @Iran-110

## [0.3.3](https://github.com/ismail9k/vue3-carousel/releases/tag/v0.3.3) - 2024-04-02

- Anchor links (a tags) redirect the app to the new page after dragging (#362) @Iran-110

## [0.3.2](https://github.com/ismail9k/vue3-carousel/releases/tag/v0.3.2) - 2023-12-11

- fix: Remove padding from carousel__pagination (#317) @ricardoboss
- enhance: Slide Performance improvements and slot props support (#324) @craigrileyuk
- enhance: Pagination apply hover classes only on supported devices (#341) @hhofner
- fix: update slides data on window resize (#354) @RickRosendaal

## [0.3.1](https://github.com/ismail9k/vue3-carousel/releases/tag/v0.3.1) - 2023-04-29

- Add MIT License (#305)
- Support i18n for text and ARIA labels (#303) @thormeier

## [0.3.0](https://github.com/ismail9k/vue3-carousel/releases/tag/v0.2.16) - 2023-04-09

- Deprecation: remove settings prop in favor of v-bind
- Enhance: Better drag experience on mobile
- Enhance: Better handling for slides width based on percentage
- Feat: add before-init event

## [0.2.16](https://github.com/ismail9k/vue3-carousel/releases/tag/v0.2.16) - 2023-04-02

### Changed

- Enhance `getSlidesVNodes` logic to recursively get nested child elements when the vNode type is Symobl(Fragment) #295

## [0.2.15](https://github.com/ismail9k/vue3-carousel/releases/tag/v0.2.15) - 2023-04-02

### Added

- Add ability to use select tag inside slides #294
