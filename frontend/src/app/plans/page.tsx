"use client";
import { Box, Container, Divider, Grid2, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import BasicFilter from "@/components/elements/Filter/Filter";
import BasicSort from "@/components/elements/Sort/Sort";
import Button from "@/components/elements/Button/Button";
import { ParentPlanType } from "@/types/type";
import PlanListCard from "@/components/module/PlanListCard";
import { fetchAllParentPlan } from "@/services/parentPlanApi";

const PlanListPage = () => {
    const [plans, setPlans] = useState<ParentPlanType[]>([]);
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("新しい順");
    const router = useRouter();

    // フィルター・ソートのオプション定義
    const filterOptions = [
        { value: "all", label: "すべて" },
        { value: "Draft", label: "下書き" },
        { value: "Published", label: "公開済み" },
    ];

    const sortOptions = ["新しい順", "古い順"];

    // プラン一覧を取得（useCallbackでメモ化）
    const loadPlansData = useCallback(async () => {
        try {
            const token = localStorage.getItem("access_token");

            if (!token) {
                router.push("/login");
                return;
            }

            const parentPlans = await fetchAllParentPlan(token);
            setPlans(parentPlans);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }, [router]);

    // フィルタリングとソートのロジックを分離
    const getFilteredAndSortedPlans = () => {
        return plans
            .filter((plan) => filter === "all" || plan.status === filter)
            .sort((a, b) => {
                if (sort === "新しい順") {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                } else if (sort === "古い順") {
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                }
                return 0;
            });
    };

    useEffect(() => {
        // ページ読み込み時にプランデータを取得
        loadPlansData();
    }, [loadPlansData]);

    // フィルタリングとソートされたプランをメモ化
    const filteredAndSortedPlans = useMemo(getFilteredAndSortedPlans, [plans, sort, filter]);

    return (
        <Container maxWidth="lg" sx={{ mt: 5, mb: 8 }}>
            {/* タイトル */}
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                プラン一覧
            </Typography>
            <Divider sx={{ mb: 4 }} />

            {/* ソート・フィルター操作 */}
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
            >
                <Stack direction="row" spacing={2}>
                    <BasicSort onChange={setSort} options={sortOptions} defaultValue="新しい順" />
                    <BasicFilter onChange={setFilter} options={filterOptions} defaultValue="all" />
                </Stack>
                <Button
                    label="プランを作成する"
                    color="success"
                    component="button"
                    href="/plans/create"
                    variant="contained"
                />
            </Stack>

            {/* プランカード一覧 */}
            <Box sx={{ mt: 6 }}>
                <Grid2 container spacing={3}>
                    {filteredAndSortedPlans.map((plan) => (
                        <Grid2 key={plan.parentPlanId} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <PlanListCard plan={plan} />
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </Container>
    );
};

export default PlanListPage;
