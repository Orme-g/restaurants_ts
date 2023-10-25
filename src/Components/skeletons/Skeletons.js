import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"

import "./skeletons.sass"

export const CardsSkeleton = () => {
    return (
        <div className="cards-skeleton">
            <Stack spacing={1} sx={{ height: "100%", width: "25%" }}>
                <Skeleton variant="rounded" sx={{ height: "60%", width: "100%" }} />
                <Skeleton variant="h3" sx={{ width: "100px" }} />
                <Skeleton variant="rounded" />
                <Skeleton variant="rounded" />
            </Stack>
            <Stack spacing={1} sx={{ height: "100%", width: "25%" }}>
                <Skeleton variant="rounded" sx={{ height: "60%", width: "100%" }} />
                <Skeleton variant="h3" sx={{ width: "100px" }} />
                <Skeleton variant="rounded" />
                <Skeleton variant="rounded" />
            </Stack>
            <Stack spacing={1} sx={{ height: "100%", width: "25%" }}>
                <Skeleton variant="rounded" sx={{ height: "60%", width: "100%" }} />
                <Skeleton variant="h3" sx={{ width: "100px" }} />
                <Skeleton variant="rounded" />
                <Skeleton variant="rounded" />
            </Stack>
        </div>
    )
}

export const CardsSliderSkeleton = () => {
    return (
        <div className="cards-slider-skeleton">
            <Stack spacing={1} sx={{ height: "100%", width: "20%" }}>
                <Skeleton variant="rounded" sx={{ height: "60%", width: "100%" }} />
                <Skeleton variant="h3" sx={{ width: "60%" }} />
                <Skeleton variant="rounded" />
                <Skeleton variant="rounded" />
            </Stack>
            <Stack spacing={1} sx={{ height: "100%", width: "20%" }}>
                <Skeleton variant="rounded" sx={{ height: "60%", width: "100%" }} />
                <Skeleton variant="h3" sx={{ width: "60%" }} />
                <Skeleton variant="rounded" />
                <Skeleton variant="rounded" />
            </Stack>
            <Stack spacing={1} sx={{ height: "100%", width: "20%" }}>
                <Skeleton variant="rounded" sx={{ height: "60%", width: "100%" }} />
                <Skeleton variant="h3" sx={{ width: "60%" }} />
                <Skeleton variant="rounded" />
                <Skeleton variant="rounded" />
            </Stack>
            <Stack spacing={1} sx={{ height: "100%", width: "20%" }}>
                <Skeleton variant="rounded" sx={{ height: "60%", width: "100%" }} />
                <Skeleton variant="h3" sx={{ width: "60%" }} />
                <Skeleton variant="rounded" />
                <Skeleton variant="rounded" />
            </Stack>
        </div>
    )
}

export const DonerCardsSkeleton = () => {
    return (
        <div className="doner-cards-skeleton">
            <Stack direction={"row"} spacing={2} sx={{ height: "45%", width: "100%" }}>
                <Skeleton variant="rounded" sx={{ height: "90%", width: "33%" }} />
                <Stack spacing={2} sx={{ height: "100%", width: "66%" }}>
                    <Skeleton variant="h3" sx={{ height: "30px", width: "40%" }} />
                    <Skeleton variant="rounded" height={20} />
                    <Skeleton variant="rounded" height={20} />
                    <Skeleton variant="rounded" height={20} />
                </Stack>
            </Stack>
            <Stack direction={"row"} spacing={2} sx={{ height: "45%", width: "100%" }}>
                <Skeleton variant="rounded" sx={{ height: "90%", width: "33%" }} />
                <Stack spacing={2} sx={{ height: "100%", width: "66%" }}>
                    <Skeleton variant="h3" sx={{ height: "30px", width: "40%" }} />
                    <Skeleton variant="rounded" height={20} />
                    <Skeleton variant="rounded" height={20} />
                    <Skeleton variant="rounded" height={20} />
                </Stack>
            </Stack>
        </div>
    )
}

export const PageSkeleton = () => {
    return (
        <div className="page-skeleton">
            <Stack spacing={2}>
                <Skeleton variant="rectangular" height={400} />
                <Skeleton variant="rounded" sx={{ width: "50%" }} />
                <Skeleton variant="rounded" sx={{ width: "80%" }} />
                <Skeleton variant="rounded" sx={{ width: "80%" }} />
                <Skeleton variant="rounded" sx={{ width: "80%" }} />
                <Skeleton variant="rounded" sx={{ width: "80%" }} />
                <Skeleton variant="rounded" sx={{ width: "65%" }} />
                <Skeleton variant="rounded" sx={{ width: "65%" }} />
            </Stack>
        </div>
    )
}
