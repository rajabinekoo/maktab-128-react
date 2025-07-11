import { useMemo, useRef } from "react";

import { FiTrash2 } from "react-icons/fi";
import { FcEditImage } from "react-icons/fc";
import { useController, type Control } from "react-hook-form";

import { classNames } from "../../utils/classnames";

interface IAvatarInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  disabled?: boolean;
  preview?: string;
  name: string;
}

export const AvatarInput: React.FC<IAvatarInputProps> = ({
  name,
  control,
  preview,
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(undefined);
  const {
    field: { onChange, value: file },
    fieldState: { error },
  } = useController({ control, name });

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.files?.[0]) return;
    const avatar = event.target.files[0];
    onChange(avatar);
  };

  const selectAvatar: React.MouseEventHandler<HTMLDivElement> = () => {
    if (!inputRef.current) return;
    if (disabled) return;
    inputRef.current.click();
  };

  const clear: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (disabled) return;
    e.stopPropagation();
    onChange(undefined);
  };

  const previewSrc = useMemo(() => {
    if (file) return URL.createObjectURL(file);
    if (preview) return preview;
    return "";
  }, [file, preview]);

  return (
    <div>
      <div
        onClick={selectAvatar}
        className={classNames(
          "relative border border-dashed border-slate-500 rounded-lg w-full",
          "aspect-square hover:bg-slate-100 cursor-pointer p-3 sm:p-5 md:p-10",
          error?.message ? "!border-red-500" : ""
        )}
      >
        {previewSrc ? (
          <img src={previewSrc} className="w-full h-full object-contain" />
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <FcEditImage className="w-30 h-30" />
          </div>
        )}
        {file && (
          <button
            type="button"
            onClick={clear}
            className="w-10 h-10 p-2 bg-red-50/50 hover:bg-red-50 cursor-pointer border border-red-500 text-red-500 rounded-lg absolute top-5 right-5 z-50"
          >
            <FiTrash2 className="w-full h-full" />
          </button>
        )}
      </div>
      {error?.message && (
        <p className="text-red-500 mt-1 text-xs font-medium">{error.message}</p>
      )}

      <input
        ref={inputRef as React.Ref<HTMLInputElement>}
        type="file"
        className="hidden"
        onChange={changeHandler}
      />
    </div>
  );
};
