import { useContext, useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Input } from "../../atom/input";
import { useDebounce } from "../../../hooks/use-debounce";
import { SearchContext } from "../../../providers/search";
import {
  searchFormSchema,
  type searchFormSchemaType,
} from "../../../validations/search-form-validation";
import { useSearchParams } from "react-router";

export const SearchForm: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const debounceSearch = useDebounce(search, 600);
  const context = useContext(SearchContext);

  useEffect(() => {
    context.setSearch(debounceSearch);
  }, [context, debounceSearch]);

  return (
    <div>
      <Input onChange={(e) => setSearch(e.target.value)} placeholder="search" />
    </div>
  );
};

export const SearchForm2: React.FC = () => {
  const context = useContext(SearchContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();
  const form = useForm<searchFormSchemaType>({
    resolver: zodResolver(searchFormSchema),
    mode: "onChange",
  });
  const debounceSearch = useDebounce(form.watch("search") || "", 600);

  useEffect(() => {
    if (form.formState.errors?.search) return setSearchParams({ s: "" });
    setSearchParams({ s: debounceSearch });
  }, [context, debounceSearch, form.formState.errors]);

  return (
    <div>
      <Controller
        control={form.control}
        name="search"
        render={({ field, fieldState: { error } }) => (
          <Input {...field} error={error?.message} placeholder="search" />
        )}
      />
    </div>
  );
};
