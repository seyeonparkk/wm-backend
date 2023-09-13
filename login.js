const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const favorites = [];

app.post('/add_favorite', (req, res) => {
    const { user_id, chargingStationId } = req.body;

    if (!user_id || !chargingStationId) {
        return res.status(400).json({ error: '사용자 아이디와 충전소 ID를 모두 제공해야 합니다.' });
    }

    // 이미 찜한 경우 중복 추가하지 않음
    if (favorites.some((favorite) => favorite.user_id === user_id && favorite.chargingStationId === chargingStationId)) {
        return res.status(400).json({ error: '이 충전소는 이미 찜한 상태입니다.' });
    }

    favorites.push({ user_id, chargingStationId });

    res.status(201).json({ message: '충전소를 찜하였습니다.' });
});

app.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
