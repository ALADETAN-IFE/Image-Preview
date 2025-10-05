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
        {/* <div className="max-h-full max-w-full"> */}
          <Image src={objectUrl} alt="Selected Preview" className="h-72" width={1200} height={288} style={{ objectFit: 'contain' }} />
        {/* </div> */}
      </div>
    </div>
  );
}
