import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import dynamic from 'next/dynamic';
import ReactQuill from 'react-quill-new';
import type { ReactQuillProps } from 'react-quill-new';


// Interfaz extendida para manejar la referencia
interface QuillWrapperProps extends ReactQuillProps {
  forwardedRef?: React.Ref<ReactQuill>;
}

// Componente interno con manejo de referencia
const QuillWrapperInner = forwardRef<ReactQuill, QuillWrapperProps>((props, ref) => {
  const quillRef = useRef<ReactQuill>(null);

  // Usar useImperativeHandle para exponer métodos del Quill
  useImperativeHandle(ref, () => {
    return quillRef.current as ReactQuill;
  }, [quillRef]);

  return (
    <ReactQuill 
      {...props} 
      ref={quillRef}
    />
  );
});

// Carga dinámica de ReactQuill
const QuillWrapper = dynamic(
  () => Promise.resolve(forwardRef<ReactQuill, QuillWrapperProps>((props, ref) => (
    <QuillWrapperInner {...props} forwardedRef={ref} />
  ))),
  { 
    ssr: false,
    loading: () => <p>Cargando editor...</p>
  }
);

QuillWrapperInner.displayName = 'QuillWrapperInner';
QuillWrapper.displayName = 'QuillWrapper';

export { QuillWrapper };