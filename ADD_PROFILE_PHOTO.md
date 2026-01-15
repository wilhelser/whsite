# 📸 Add Your Profile Photo

## Quick Instructions

Your site is ready for your profile photo! Just save it to the right location.

### Option 1: Drag & Drop (Easiest)

1. Save the profile photo you attached as `profile.jpg`
2. Drag it into the `assets/images/` folder in your project
3. The site will automatically reload and show it!

### Option 2: Command Line

```bash
# If your photo is on your desktop:
cp ~/Desktop/your-photo.jpg assets/images/profile.jpg

# Or from Downloads:
cp ~/Downloads/your-photo.jpg assets/images/profile.jpg
```

### Option 3: Manual

1. Create the folder if it doesn't exist: `mkdir -p assets/images`
2. Save your photo as `assets/images/profile.jpg`
3. Refresh your browser

## What's Been Set Up

✅ **HTML Updated** - Profile photo added above your name  
✅ **CSS Styled** - Circular mask with blue border  
✅ **Animations** - Fade-in effect on load  
✅ **Hover Effect** - Slight zoom and glow on hover  
✅ **Responsive** - Smaller on mobile (150px vs 200px)  

## Photo Specs

- **Size**: 200px × 200px (desktop), 150px × 150px (mobile)
- **Shape**: Circular (automatically masked)
- **Border**: 4px blue accent border
- **Format**: JPG, PNG, or WebP
- **Recommended**: Square photo, at least 400px × 400px for best quality

## Styling Details

### Desktop:
- 200px diameter circle
- 4px blue border
- Subtle blue glow shadow
- Hover: scales to 105% with stronger glow
- Fade-in animation on page load

### Mobile:
- 150px diameter circle
- 3px blue border
- Same effects, just smaller

## File Location

```
site/
└── assets/
    └── images/
        └── profile.jpg  ← Your photo goes here
```

## Customization

### Change Size

Edit `assets/css/style.css`:

```css
.profile-photo img {
    width: 250px;  /* Change this */
    height: 250px; /* And this */
}
```

### Change Border Color

```css
.profile-photo img {
    border: 4px solid #ff0000; /* Red border */
}
```

### Remove Hover Effect

```css
.profile-photo img:hover {
    transform: none;
    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
}
```

### Change Animation

```css
@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: scale(0.8); /* Start smaller */
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}
```

## Troubleshooting

**Photo not showing?**
- Check the file is named exactly `profile.jpg`
- Check it's in `assets/images/` folder
- Try refreshing the browser (Cmd+Shift+R)
- Check browser console for errors

**Photo looks stretched?**
- Use a square photo for best results
- The CSS uses `object-fit: cover` to crop nicely
- Recommended: 400px × 400px or larger

**Border not showing?**
- Make sure the CSS changes saved
- Check browser console for errors
- Try hard refresh

## Next Steps

1. Save your profile photo to `assets/images/profile.jpg`
2. Visit http://127.0.0.1:4001/
3. See your photo in a beautiful circle above your name!

---

**Your profile photo section is ready!** 🎉

Just add the image file and you're all set!

