const users = [
  { id: 0, name: 'Umi', nickName: 'U', gender: 'MALE' },
  { id: 1, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
];

export default {
  'GET /api/v1/queryUserList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
  'PUT /api/v1/user/': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
  'POST /api/v1/login': (req: any, res: any) => {
    setTimeout(() => {
      if (req.body.username === '111') {
        res.json({
          success: true,
          errorCode: 0,
          data: {

          },
        });
      } else {
        res.json({
          success: false,
          errorCode: 0,
          data: {

          },
        });
      }
    }, Math.random() * 5000);
  }
};
