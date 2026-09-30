# Earth Texture Provenance

`blue-marble-land-ocean-ice-2048.jpg` is the local equirectangular surface
texture used by the RITWIK OS professional globe.

- Title: **The Blue Marble: Land Surface, Ocean Color and Sea Ice**
- Publisher: NASA Visible Earth / NASA Goddard Space Flight Center
- Source page: https://visibleearth.nasa.gov/images/57723/the-blue-marble
- Direct source asset:
  https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57730/land_ocean_ice_2048.jpg
- Credit: Reto Stöckli, NASA/GSFC; supporting MODIS and Blue Marble teams are
  credited on the source page.
- Source availability: NASA states that the Blue Marble images are freely
  available to educators, scientists, museums, and the public.
- Local dimensions: 2048 × 1024 pixels
- Local size: 266,599 bytes
- SHA-256:
  `d4dc80a6ef571939d0abe04a9bed3d3d1e6cd63e59514be1c5e43a6b069e6f1e`

`earth-at-night-2048.png` is the local equirectangular night-lights texture
used on the globe's night-facing hemisphere.

- Title: **Earth At Night (WMS)**
- Publisher: NASA Scientific Visualization Studio / NASA Goddard Space Flight
  Center
- Source page: https://svs.gsfc.nasa.gov/2916
- Direct source asset:
  https://svs.gsfc.nasa.gov/vis/a000000/a002900/a002916/earthatnight-2048.png
- Credit: data courtesy Marc Imhoff (NASA/GSFC) and Christopher Elvidge
  (NOAA/NGDC); image by Craig Mayhew (NASA/GSFC) and Robert Simmon
  (NASA/GSFC).
- Local dimensions: 2048 × 1024 pixels
- Local size: 1,097,832 bytes
- SHA-256:
  `28407a1a802868852b3c232dbeaf16b5165e8200898cc7df6a2fec70708556cd`

The application serves both source images locally. It does not depend on a
remote runtime image host. The globe shader blends the two textures from a
world-space light direction rather than overlaying the night map at constant
opacity.
