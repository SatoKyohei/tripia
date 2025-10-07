import { Avatar, Card, CardContent, Divider, Stack, TextField, Typography } from "@mui/material";
import Button from "@/components/elements/Button/Button";

type DashBoardUserInfoTabProps = {
    thumbnail?: string;
    name: string;
    email: string;
    isEditing: boolean;
    setIsEditing: (value: React.SetStateAction<boolean>) => void;
    setName: (value: string) => void;
    setEmail: (value: string) => void;
};

const DashBoardUserInfoTab = ({
    thumbnail,
    name,
    email,
    isEditing,
    setIsEditing,
    setName,
    setEmail,
}: DashBoardUserInfoTabProps) => {
    return (
        <Stack spacing={3} alignItems="center">
            <Avatar src={thumbnail} alt="profile" sx={{ width: 120, height: 120, mb: 1 }} />
            <Typography variant="h5" component="div">
                {name}
            </Typography>
            <Card sx={{ p: 2, width: "100%" }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        ユーザー情報
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Stack spacing={2}>
                        <TextField
                            label="ユーザー名"
                            variant="outlined"
                            size="small"
                            value={name}
                            disabled={!isEditing}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            size="small"
                            value={email}
                            disabled={!isEditing}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            label={isEditing ? "保存" : "変更する"}
                            variant="contained"
                            onClick={() => setIsEditing((prev) => !prev)}
                        />
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    );
};

export default DashBoardUserInfoTab;
