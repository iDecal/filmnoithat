# Corance catalogue

Imported 201 unique film codes from the supplied 35-page scanned PDF
`1048289957-Corance-Catalog-1.pdf`. Product crops come from physical PDF pages
5–30. Decorative panels and technical pages are excluded.

Run `python scripts/import-corance.py <source.pdf>` with PyMuPDF and Pillow.
The importer checks the source SHA256 and uses the audited embedded-raster
coordinates in `scripts/corance-regions.json`. Lossless WebP preserves the
cropped RGB pixels; there is no enlargement, sharpening or color adjustment.
Original crops keep their proportions. Website cards display centered 4:3
frames; the zoom view shows the original crop.

`src/data/corance.json` is separate from INFEEL data, with brand-prefixed URLs,
source PDF page links, estimated color names, and per-series roll dimensions.
Most series list 1.24 m × 50 m; CAN lists 1.26 m × 150 m or 1.24 m × 30 m,
depending on the version. Confirm the supplied version before ordering.
Colors support navigation and are not official manufacturer color names.
No origin, fire rating, stock or price claims were inferred from the scan.

The existing material grids offer a brand filter. Example:
`/vat-lieu/van-go/?brand=Corance#mau-vat-lieu`.
