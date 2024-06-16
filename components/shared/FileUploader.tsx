import React, { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { convertFileToUrl } from '@/lib/utils';
import { Button } from '../ui/button';

type FileUploaderProps = {
  imageUrls: string[];
  onFieldChange: (value: string[]) => void;
  setFiles: Dispatch<SetStateAction<File[]>>
}

const FileUploader = ({ imageUrls, onFieldChange, setFiles }: FileUploaderProps) => {
  const [files, setLocalFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setLocalFiles(acceptedFiles);
    onFieldChange(acceptedFiles.map(file => convertFileToUrl(file)));
  }, [onFieldChange, setFiles]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
  })

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    setLocalFiles(newFiles);
    onFieldChange(newFiles.map(file => convertFileToUrl(file)));
  };

  return (
    <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
      <input {...getInputProps()} />
      <p>Drop files here or click to upload</p>
      {files.length > 0 && (
        <div>
            Uploaded {files.length} files
        </div>
      )}
      <div style={{ marginTop: '20px' }}>
        {imageUrls.map((url, index) => (
          <div key={index} style={{ marginBottom: '10px', position: 'relative' }}>
            <img src={url} alt={`uploaded ${index}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
            <button
              onClick={() => removeFile(index)}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer'
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUploader