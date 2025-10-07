import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import Button from "@/components/elements/Button/Button";

const DashBoardActivityTab = () => {
    return (
        <Card sx={{ p: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    アクティビティ
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={2}>
                    <Typography variant="body1">作成したプラン数：5</Typography>
                    <Typography variant="body1">参加予定のプラン：2</Typography>
                    <Typography variant="body1">お気に入りの場所：3</Typography>
                    <Button label="もっと見る" variant="outlined" />
                </Stack>
            </CardContent>
        </Card>
    );
};

export default DashBoardActivityTab;
