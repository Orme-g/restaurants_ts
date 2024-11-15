import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import "./skeletons.sass";

export const CardsSkeleton = () => {
    return (
        <div className="cards-skeleton">
            <Stack spacing={1} sx={{ height: "100%", width: "25%" }}>
                <Skeleton variant="rounded" sx={{ height: "60%", width: "100%" }} />
                <Skeleton variant="rectangular" sx={{ width: "100px" }} />
                <Skeleton variant="rounded" />
                <Skeleton variant="rounded" />
            </Stack>
            <Stack spacing={1} sx={{ height: "100%", width: "25%" }}>
                <Skeleton variant="rounded" sx={{ height: "60%", width: "100%" }} />
                <Skeleton variant="rectangular" sx={{ width: "100px" }} />
                <Skeleton variant="rounded" />
                <Skeleton variant="rounded" />
            </Stack>
            <Stack spacing={1} sx={{ height: "100%", width: "25%" }}>
                <Skeleton variant="rounded" sx={{ height: "60%", width: "100%" }} />
                <Skeleton variant="rectangular" sx={{ width: "100px" }} />
                <Skeleton variant="rounded" />
                <Skeleton variant="rounded" />
            </Stack>
        </div>
    );
};

export const CardsSliderSkeleton = () => {
    return (
        <div className="cards-slider-skeleton">
            <Stack spacing={1} sx={{ height: "100%", width: "20%" }}>
                <Skeleton variant="rounded" sx={{ height: "60%", width: "100%" }} />
                <Skeleton variant="rectangular" sx={{ width: "60%" }} />
                <Skeleton variant="rounded" />
                <Skeleton variant="rounded" />
            </Stack>
            <Stack spacing={1} sx={{ height: "100%", width: "20%" }}>
                <Skeleton variant="rounded" sx={{ height: "60%", width: "100%" }} />
                <Skeleton variant="rectangular" sx={{ width: "60%" }} />
                <Skeleton variant="rounded" />
                <Skeleton variant="rounded" />
            </Stack>
            <Stack spacing={1} sx={{ height: "100%", width: "20%" }}>
                <Skeleton variant="rounded" sx={{ height: "60%", width: "100%" }} />
                <Skeleton variant="rectangular" sx={{ width: "60%" }} />
                <Skeleton variant="rounded" />
                <Skeleton variant="rounded" />
            </Stack>
            <Stack spacing={1} sx={{ height: "100%", width: "20%" }}>
                <Skeleton variant="rounded" sx={{ height: "60%", width: "100%" }} />
                <Skeleton variant="rectangular" sx={{ width: "60%" }} />
                <Skeleton variant="rounded" />
                <Skeleton variant="rounded" />
            </Stack>
        </div>
    );
};

export const LongCardsSkeleton = () => {
    return (
        <div className="doner-cards-skeleton">
            <Stack direction={"row"} spacing={2} sx={{ height: "45%", width: "100%" }}>
                <Skeleton variant="rounded" sx={{ height: "90%", width: "33%" }} />
                <Stack spacing={2} sx={{ height: "100%", width: "66%" }}>
                    <Skeleton variant="rectangular" sx={{ height: "30px", width: "40%" }} />
                    <Skeleton variant="rounded" height={20} />
                    <Skeleton variant="rounded" height={20} />
                    <Skeleton variant="rounded" height={20} />
                </Stack>
            </Stack>
            <Stack direction={"row"} spacing={2} sx={{ height: "45%", width: "100%" }}>
                <Skeleton variant="rounded" sx={{ height: "90%", width: "33%" }} />
                <Stack spacing={2} sx={{ height: "100%", width: "66%" }}>
                    <Skeleton variant="rectangular" sx={{ height: "30px", width: "40%" }} />
                    <Skeleton variant="rounded" height={20} />
                    <Skeleton variant="rounded" height={20} />
                    <Skeleton variant="rounded" height={20} />
                </Stack>
            </Stack>
        </div>
    );
};

export const PageSkeleton = () => {
    return (
        <div className="page-skeleton">
            <Stack spacing={2} margin={"0 auto"} width={"80%"}>
                <Skeleton variant="rectangular" height={400} />
                <Skeleton variant="rounded" width={"50%"} />
                <Skeleton variant="rounded" width={"80%"} />
                <Skeleton variant="rounded" width={"80%"} />
                <Skeleton variant="rounded" width={"80%"} />
                <Skeleton variant="rounded" width={"80%"} />
                <Skeleton variant="rounded" width={"65%"} />
                <Skeleton variant="rounded" width={"65%"} />
            </Stack>
        </div>
    );
};

export const ShortLineSkeleton = () => {
    return (
        <div className="line-skeleton">
            <Skeleton variant="text" height={30} sx={{ width: "300px" }} />
        </div>
    );
};

export const ReviewItemSkeleton = () => {
    return (
        <div className="review-item-skeleton">
            <Stack className="review-item-skeleton__header" direction={"row"} spacing={2}>
                <Skeleton variant="circular" height={70} width={70} />
                <Skeleton variant="rounded" height={50} width={"80%"} />
            </Stack>
            <Stack className="review-item-skeleton__text" direction={"row"}>
                <Skeleton variant="text" height={50} width={"25%"} />
                <Skeleton variant="text" height={50} width={"60%"} />
            </Stack>
            <Stack className="review-item-skeleton__text" direction={"row"}>
                <Skeleton variant="text" height={50} width={"25%"} />
                <Skeleton variant="text" height={50} width={"60%"} />
            </Stack>
        </div>
    );
};

export const BlogerProfilePageSkeleton = () => {
    return (
        <div className="bloger-profile-page-skeleton">
            <Stack marginBottom={7}>
                <Skeleton variant="rounded" height={250} width={"55%"} />
            </Stack>
            <Stack marginBottom={3}>
                <Skeleton variant="text" height={50} width={"40%"} />
            </Stack>
            <Stack direction={"row"} spacing={4} justifyContent={"space-between"}>
                <Skeleton variant="rounded" height={250} width={"20%"} />
                <Skeleton variant="rounded" height={250} width={"20%"} />
                <Skeleton variant="rounded" height={250} width={"20%"} />
                <Skeleton variant="rounded" height={250} width={"20%"} />
            </Stack>
            <Stack marginTop={10} spacing={4}>
                <Skeleton variant="text" height={50} width={"40%"} />
                <Skeleton variant="rounded" height={120} width={"60%"} />
                <Skeleton variant="rounded" height={120} width={"60%"} />
                <Skeleton variant="rounded" height={120} width={"60%"} />
                <Skeleton variant="rounded" height={120} width={"60%"} />
            </Stack>
        </div>
    );
};

export const AuthorBadgeSkeleton = () => {
    return (
        // <div className="bloger-badge-skeleton">
        <Stack direction={"row"} className="bloger-badge-skeleton">
            <Skeleton variant="circular" className="bloger-badge-skeleton__circle" />
            <Stack
                direction={"column"}
                marginLeft={"10px"}
                justifyContent={"space-evenly"}
                width={"100%"}
            >
                <Skeleton variant="text" />
                <Skeleton variant="text" />
            </Stack>
        </Stack>
        // </div>
    );
};

export const BlogPostCardSkeleton = () => {
    return (
        <Stack direction={"column"}>
            <Skeleton variant="rounded" height={"50%"} />
            <Stack direction={"column"} height={"50%"}>
                <Stack direction={"column"} height={"80%"} justifyContent={"space-evenly"}>
                    <Skeleton variant="text" width={"80%"} height={"20%"} />
                    <Skeleton variant="rounded" height={"40%"} />
                </Stack>

                <Stack
                    direction={"row"}
                    marginTop={"auto"}
                    height={"20%"}
                    justifyContent={"space-between"}
                >
                    <Skeleton variant="text" width={"30%"} height={"100%"} />
                    <Skeleton variant="text" width={"30%"} height={"100%"} />
                </Stack>
            </Stack>
        </Stack>
    );
};
