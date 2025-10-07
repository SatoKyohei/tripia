import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import Button from "@/components/elements/Button/Button";

const DashBoardAcountTab = () => {
    return (
        <Card sx={{ p: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    アカウント操作
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Stack direction="row" spacing={2}>
                    <Button label="アカウント削除" variant="outlined" color="secondary" />
                </Stack>
            </CardContent>
        </Card>
    );
};

export default DashBoardAcountTab;
