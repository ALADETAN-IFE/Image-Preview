# Image-Preview

Welcome to **Image-Preview**!

This project provides a modern React component for previewing images with visually distinct foreground and background layers. It is built with TypeScript, focusing on clean separation, accessibility, and visual appeal.

---

## How It Works

The `ImagePreview` component offers a dual-layer display:

- **Background**: A blurred, semi-transparent version of the image fills the container, providing visual context without distracting from the main subject. This is accomplished using CSS opacity and blur filters.
- **Foreground**: The actual image is shown sharp, centered, and contained, ensuring the user sees the selected image clearly and at high quality.

### Foreground and Background Explained

- **Foreground**:  
  The foreground is the main focus—the exact image the user selected, rendered crisp, centered, and contained within the preview area. This allows users to accurately inspect the image.

- **Background**:  
  The background is a larger, blurred, and slightly transparent version of the same image. It serves as a contextual backdrop, making the preview visually rich while maintaining focus on the main image. The background effect is achieved using:
  - `opacity-40` for transparency
  - `filter blur-sm` for a soft blur
  - `objectFit: 'cover'` to ensure the background fills the preview area

---

## Example Usage

```tsx
import { ImagePreview } from './ImagePreview';

function App() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files?.[0] ?? null)} />
      {file && <ImagePreview file={file} />}
    </div>
  );
}
```

---

## Features

- **Foreground/Background Layering:** Visually separates the main image from its context for clarity and style.
- **Instant Preview:** Uses `URL.createObjectURL` for fast, local previews.
- **TypeScript Support:** Ensures type safety and developer confidence.
- **Responsiveness:** The layout adapts to container size, centering the image.

---

## Code Overview

```tsx
function ImagePreview({ file }: { file: File }) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    return () => {
      URL.revokeObjectURL(url);
      setObjectUrl(null);
    };
  }, [file]);

  if (!objectUrl) return null;

  return (
    <div className="relative h-72 w-full border border-foreground/20 rounded overflow-hidden">
      {/* Background: larger, slightly opaque/blurred cover */}
      <div className="absolute inset-0 opacity-40 filter blur-sm">
        <Image src={objectUrl} alt="bg" fill style={{ objectFit: 'cover', objectPosition: 'top' }} priority={false} />
      </div>
      {/* Foreground: contained image centered */}
      <div className="relative h-full w-full flex items-center justify-center p-4">
        <Image src={objectUrl} alt="Selected Preview" className="h-72" width={1200} height={288} style={{ objectFit: 'contain' }} />
      </div>
    </div>
  );
}
```

---

## Customization

You can adjust the background opacity, blur, and sizing to fit your design. The foreground's containment and centering can also be tweaked by editing the relevant CSS classes or styles.

---

## License

This project currently does not specify a license. Please open an issue to discuss licensing if needed.

## Contact

For questions or suggestions, open an issue in this repository or contact [ALADETAN-IFE](https://github.com/ALADETAN-IFE).

---

*Happy Previewing!*
