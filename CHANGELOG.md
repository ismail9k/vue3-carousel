# Changelog

All notable changes to this project will be documented in this file.

## [0.15.1](https://github.com/ismail9k/vue3-carousel/releases/tag/v0.15.1) - 2025-05-03

- fix: allow users to pinch zoom on mobile and prevent click properly only if user drags more than 10px by @Tofandel in #507

## [0.15.0](https://github.com/ismail9k/vue3-carousel/releases/tag/v0.15.0) - 2025-03-14

- Allow carousel ref to be passed to Pagination and Navigation by @Tofandel in #487
- feat: add threshold option for slide transition customization by @tbranger in #489
- Mouse scroll support by @ismail9k in #494
- Refactor: Use Composable Functions by @ismail9k in #493

## [0.14.0](https://github.com/ismail9k/vue3-carousel/releases/tag/v0.14.0) - 2025-02-09

- use LiveCodes for docs examples by @hatemhosny in #476
- Replace rollup-plugin-dts with vite-plugin-dts to fix type declaration issues by @olafyang in #478
- Add a convenient option for styling pagination by @ismail9k in #475

## [0.13.0](https://github.com/ismail9k/vue3-carousel/releases/tag/v0.13.0) - 2025-01-15

- feat: add preventExcessiveDragging option to limit boundary slide gestures by @aovcina in #468
- Support items to show auto by @ismail9k in #467
- Refactor/enhancments by @ismail9k in #469

## [0.12.0](https://github.com/ismail9k/vue3-carousel/releases/tag/v0.12.0) - 2024-12-26

- Generate cloned slides dynamically based on the active slides @ismail9k in #462, #465
- Add logo, footer, and features showcase to documentation by @ismail9k in #463
- Add fade in-out animation effect to carousel by @ismail9k in #464
- General fixes and enhancements

## [0.11.0](https://github.com/ismail9k/vue3-carousel/releases/tag/v0.11.0) - 2024-12-23

- fix: reorder exports in package.json by @BR0kEN- in #458
- Enhance carousel performance and slide management in #456
- fix: update Vue peer dependency version to 3.5.0 in #460
- Validate itemsToShow configuration in #461

## [0.10.0](https://github.com/ismail9k/vue3-carousel/releases/tag/v0.10.0) - 2024-12-16

- docs: enable local search by @vintagesucks in #447
- Allow ignoring animations by @Tofandel in #441
- fix: exported symbol differs from internal by @Tofandel in #449
- fix: SSR hydration issue by @Tofandel in #453
- feat: add paginated navigation for carousel pagination by @Tofandel in #446

## [0.9.0](https://github.com/ismail9k/vue3-carousel/releases/tag/v0.9.0) - 2024-12-09

- Fixed carousel flickering during resize in #431
- Fixed carousel: Dynamic slot recalculation in render function in #430
- Documentation: Updated events file in #432
- Refactored: Improved provide/inject using a single symbol in #434
- Feature: Added easy addon customization in #435
- Fixed issues from recent updates in #440
- Fixed SSR for cloned slides in #444
- Fixed reactivity: Using provide to register slides instead of traversing nodes (fixes #433, #350)
- Fixed reactivity: Using computed and watchers instead of manual updates
- Fixed reactivity: Updated vModel during sliding rather than after transition (fixes #428)
- Fixed carousel: Updated sizes during animations (fixes #338)
- Fixed accessibility: Made elements in cloned slides non-focusable (fixes #346)
- Fixed accessibility: Added arrow key support for focused carousel (via tab)
- Fixed performance: Cloning only itemsToShow + 11 elements instead of all slides
- Improved types: Enhanced typings, added TSC during tests, and exported properly defined components
- Fixed package: Corrected order of browser, require, and import

## [0.8.1](https://github.com/ismail9k/vue3-carousel/releases/tag/v0.8.1) - 2024-11-26

- fix: cannot set properties on null (setting 'index') issue by @ismail9k in #427
- Better support for typescript and add CarouselExposed type by @ismail9k in #429

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
