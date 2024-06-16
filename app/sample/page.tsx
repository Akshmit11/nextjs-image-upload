'use client'

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../api/uploadthing/core";
 
 
const Sample = () => (
  <UploadButton<OurFileRouter>
    endpoint="imageUploader"
    onClientUploadComplete={(res: any) => {
      // Do something with the response
      console.log("Files: ", res);
      alert("Upload Completed");
    }}
    onUploadError={(error: Error) => {
      // Do something with the error.
      alert(`ERROR! ${error.message}`);
    }}
    onBeforeUploadBegin={(files: any) => {
      // Preprocess files before uploading (e.g. rename them)
      return files.map(
        (f: any) => new File([f], "renamed-" + f.name, { type: f.type }),
      );
    }}
    onUploadBegin={(name) => {
      // Do something once upload begins
      console.log("Uploading: ", name);
    }}
  />
);

export default Sample;