# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.6.2] - 6.05.2020
- Added options for stripe customization - @paulpartington-cti
- Fixed readme - @ianrushton88
- Added support translation for title of payment method - @dimasch

## [2.6.1] - 13.04.2020

- Fixed placing order (event bus registration)

## [2.6.0] - 12.04.2020

- Compatibility with VSF 1.11.x, updated documentation. - @dimasch (#43)

## [2.5.3] - 09.12.2019

- Hide loader if we have card input validation errors. - @dimasch (#37)

## [2.5.2] - 08.12.2019

- Fixed after clicking on the "Place the order" button, the page loading icon appears and immediately disappears - @dimasch (#35)

## [2.5.1] - 01.12.2019

- Load the stripe dependencies on component mount level - prevent load on home page and etc. - @dimasch (#33)

## [2.5.0] - 12.11.2019

### New feature
- Compatibility with the official Stripe magento2 module - @dimasch (#20)

## [2.4.1] - 10.11.2019

### Fixed
- Added support the custom payment method code - @dimasch (#30)

## [2.4.0] - 5.11.2019

### Fixed
- Added VSF module signature for beforeRegistration hook - @dimasch (#28)