# Hero Background Video Setup

## Current Implementation

The hero section now features a dynamic video background with fallbacks and optimization. Here's how to customize it:

## Video Requirements

For optimal performance and visual impact:

- **Format**: MP4 (H.264 codec recommended)
- **Duration**: 10-30 seconds (will loop automatically)
- **Resolution**: 1920x1080 or higher
- **File Size**: Under 5MB for best performance
- **Content**: Should be subtle enough to not distract from text

## Recommended Video Sources

### Free High-Quality Options:
1. **Pixabay**: https://pixabay.com/videos/search/technology/
2. **Pexels**: https://www.pexels.com/search/videos/technology/
3. **Mixkit**: https://mixkit.co/free-stock-video/technology/

### Suggested Search Terms:
- "futuristic technology background"
- "digital particles animation"
- "abstract tech background"
- "neural network animation"
- "AI technology background"

## How to Replace the Video

1. **Upload your video** to a reliable CDN or hosting service
2. **Update the video sources** in `/src/app/page.tsx`:

```tsx
<HeroVideoBackground
  videoSources={[
    "YOUR_PRIMARY_VIDEO_URL.mp4",
    "YOUR_BACKUP_VIDEO_URL.mp4",
    "YOUR_FALLBACK_VIDEO_URL.mp4"
  ]}
  className="-z-20"
/>
```

## Video Similar to Your Reference

For a video similar to: https://cdn.dribbble.com/userupload/5624144/file/original-3bd45bb714420c2a014d6a8f11f91626.mp4

Look for videos with:
- Digital particle effects
- Flowing geometric shapes
- Technology/AI themes
- Dark backgrounds with bright accents
- Smooth, slow movements

## Performance Notes

- Videos are automatically disabled on mobile devices for performance
- Multiple source URLs provide fallbacks if one fails
- Video has blur and contrast filters applied
- Opacity is set to 20% to ensure text readability

## Customization Options

You can adjust the video appearance in `/src/components/HeroVideoBackground.tsx`:

- **Opacity**: Change `opacity-20` to your preferred level
- **Filters**: Modify `brightness(0.7) contrast(1.2)`
- **Overlay**: Adjust the background overlay colors

## Current Video Sources

The component currently uses placeholder videos from Pixabay. Replace these with your preferred video URLs for the final implementation.
