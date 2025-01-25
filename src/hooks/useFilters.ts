import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { useState, useEffect, useTransition, ChangeEvent } from "react";
import { FaMale, FaFemale } from "react-icons/fa";
import userFilterStore from "./useFilterStore";
import { Selection } from "@nextui-org/react";
import usePaginationStore from "./usePaginationStore";

export const useFilters = () => {
  const pathName = usePathname();

  const searchParams = useSearchParams();
  const router = useRouter();

  const [clientLoaded, setClientLoaded] = useState(false);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setClientLoaded(true);
  }, []);

  const { filters, setFilters } = userFilterStore();

  const { gender, ageRange, orderBy, withPhoto } = filters;

  const { pageNumber, pageSize, setPage } = usePaginationStore((state) => ({
    pageNumber: state.pagination.pageNumber,
    pageSize: state.pagination.pageSize,
    setPage: state.setPage,
  }));

  useEffect(() => {
    if (gender || ageRange || orderBy || withPhoto) {
      setPage(1);
    }
  }, [gender, ageRange, orderBy, withPhoto,setPage]);

  useEffect(() => {
    startTransition(() => {
      const searchParams = new URLSearchParams();

      if (pathName === "/reset-password") {
        return;
      }

      if (gender) searchParams.set("gender", gender.join(","));
      if (ageRange) searchParams.set("ageRange", ageRange.toString());
      if (orderBy) searchParams.set("orderBy", orderBy);
      if (pageSize) searchParams.set("pageSize", pageSize.toString());
      if (pageNumber) searchParams.set("pageNumber", pageNumber.toString());

      searchParams.set("withPhoto", withPhoto.toString());

      router.replace(`${pathName}?${searchParams}`);
    });
  }, [ageRange, orderBy, gender, router, pathName, pageNumber, pageSize,withPhoto]);

  const orderByList = [
    { label: "Last Active", value: "updated" },
    { label: "Newest members", value: "created" },
  ];

  const genderList = [
    { value: "male", icon: FaMale },
    { value: "female", icon: FaFemale },
  ];

  const handleAgeSelect = (value: number[]) => {
    setFilters("ageRange", value);
  };

  const handleOrderSelect = (value: Selection) => {
    if (value instanceof Set) {
      setFilters("orderBy", value.values().next().value);
    }
  };

  const handleGenderSelect = (value: string) => {
    if (gender.includes(value)) {
      setFilters(
        "gender",
        gender.filter((g) => g !== value)
      );
    } else {
      setFilters("gender", [...gender, value]);
    }
  };

  const handleWithPhotoToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters("withPhoto", e.target.checked);
  };
  return {
    orderByList,
    genderList,
    selectAge: handleAgeSelect,
    selectGender: handleGenderSelect,
    selectOrder: handleOrderSelect,
    selectWithPhoto: handleWithPhotoToggle,
    filters,
    clientLoaded,
    isPending,
  };
};
