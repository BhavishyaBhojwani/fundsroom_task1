# Favourites Feature Documentation

## Overview
A complete favourites system has been added to the Palace Real Estate website, allowing users to save properties they're interested in and view them on a dedicated favourites page.

## Features

### 1. **Heart Icon on Property Cards**
- Each property card now has a clickable heart icon
- Click to add/remove properties from favourites
- Heart icon turns red when property is favourited
- Visual feedback with smooth animations

### 2. **Favourites Page** (`favourites.html`)
- Dedicated page to view all saved properties
- Accessible via navigation menu
- Shows empty state when no favourites exist
- Properties can be removed from favourites directly on this page

### 3. **Header Badge Counter**
- Red heart icon in the header shows favourite count
- Updates in real-time when properties are added/removed
- Links directly to favourites page
- Badge only shows when count > 0

### 4. **Navigation Menu**
- New "Favourites" link added to main navigation
- Available on all pages
- Easy access to view saved properties

### 5. **Local Storage**
- Favourites are saved in browser's localStorage
- Persists across page refreshes
- Data remains even after closing browser
- No backend required

## Technical Implementation

### Files Created/Modified

#### New Files:
1. **`favourites.html`** - Favourites page
2. **`assets/js/favourites.js`** - Favourites functionality
3. **`assets/css/favourites.css`** - Favourites styling
4. **`FAVOURITES_README.md`** - This documentation

#### Modified Files:
1. **`index.html`** - Added navigation link, heart icon, property IDs, script
2. **`property.html`** - Added navigation link, heart icon, property IDs, script
3. **`about.html`** - Added navigation link, heart icon, script
4. **`services.html`** - Added navigation link, heart icon, script
5. **`blog.html`** - Added navigation link, heart icon, script
6. **`contact.html`** - Added navigation link, heart icon, script

### Property Data Structure

Each property has the following data in `favourites.js`:
```javascript
{
    id: 'property1',
    title: 'Property Title',
    location: 'Property Location',
    price: '$2,400',
    priceUnit: '/month',
    beds: '4 Beds',
    bathrooms: '2 Bathrooms',
    area: '6x8 m²',
    image: 'path/to/image.jpg',
    detailPage: 'property-detail_01.html',
    tag: 'Featured'
}
```

### Key Functions in `favourites.js`

- `getFavourites()` - Retrieve favourites from localStorage
- `saveFavourites()` - Save favourites to localStorage
- `isFavourite(propertyId)` - Check if property is favourited
- `addToFavourites(propertyId)` - Add property to favourites
- `removeFromFavourites(propertyId)` - Remove property from favourites
- `toggleFavourite(propertyId)` - Toggle favourite status
- `updateFavouriteCount()` - Update badge counter
- `loadFavouritesPage()` - Load properties on favourites page
- `generatePropertyCard()` - Generate HTML for property card

## User Experience

1. **Adding to Favourites:**
   - Click heart icon on any property card
   - Heart turns red
   - Notification appears: "Added to favourites!"
   - Header badge counter updates

2. **Removing from Favourites:**
   - Click red heart icon again
   - Heart returns to outline
   - Notification appears: "Removed from favourites!"
   - Header badge counter updates

3. **Viewing Favourites:**
   - Click "Favourites" in navigation OR click heart icon in header
   - View all saved properties
   - Click heart on any property to remove it
   - Empty state shown if no favourites

## Properties Available

Currently 6 properties are configured:
- Property 1: Super deluxe bed room near sea beech
- Property 2: Super deluxe bed room near sea beech (20% off)
- Property 3: Super deluxe bed room near sea beech
- Property 4: Outside the cities happy home for live
- Property 5: Super deluxe bed room with best touch
- Property 6: Fully glaze oriented house for sell

## Adding New Properties

To add new properties to the favourites system:

1. **Add property data** to `assets/js/favourites.js`:
```javascript
'property7': {
    id: 'property7',
    title: 'Your Property Title',
    location: 'Property Location',
    price: '$3,000',
    priceUnit: '/month',
    beds: '5 Beds',
    bathrooms: '3 Bathrooms',
    area: '8x10 m²',
    image: 'assets/images/resource/property7.jpg',
    detailPage: 'property-detail_07.html',
    tag: 'New'
}
```

2. **Add property ID** to heart icon in HTML:
```html
<a class="property-block_one-heart" data-property-id="property7">
    <img src="assets/images/icons/heart.svg" alt="" />
</a>
```

## Browser Compatibility

- Chrome: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Edge: ✅ Full support
- IE11: ⚠️ Partial support (localStorage supported, some CSS may vary)

## Mobile Responsive

- Fully responsive design
- Touch-friendly heart icons
- Optimized notification positioning
- Mobile-friendly layout

## Notes

- Favourites are stored per browser (not synced across devices)
- Clearing browser data will remove saved favourites
- No user authentication required
- Privacy-friendly (all data stays in browser)

## Future Enhancements

Possible improvements:
- Add filters/sorting on favourites page
- Export favourites as PDF/email
- Share favourites via link
- Compare favourite properties
- Backend integration for cross-device sync
- User accounts for persistent favourites

---

**Created:** December 9, 2025  
**Version:** 1.0  
**Developer:** Palace Real Estate Team
