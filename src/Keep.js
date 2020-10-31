<Grid container
        spacing={3}>
        <Grid item
          xs={6}>
          <div className="boxLeft">
            <CssBaseline/>
            <div className={
              classes.paper
            }>
              <Avatar className={
                classes.avatar
              }>
                <LockOutlinedIcon/>
              </Avatar>
              <Typography component="h1" variant="h5">
                관리자 등록
              </Typography>
              <form className={
                  classes.form
                }
                noValidate>
                <TextField variant="outlined" margin="normal" required fullWidth id="id" label="아이디" name="ID" autoComplete="ID" autoFocus/>
                <TextField variant="outlined" margin="normal" required fullWidth name="password" label="비밀번호" type="password" id="password" autoComplete="current-password"/>
                <TextField variant="outlined" margin="normal" required fullWidth name="password_verify" label="비밀번호확인" type="password_verify" id="password_verify" autoComplete="current-password"/>
                <Button type="button" fullWidth variant="contained" color="primary"
                  className={
                    classes.submit
                  }
                  onClick={joinAdminUser}>
                  등록하기
                </Button>
                <Grid container>
                  <Grid item xs>
                    {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */} </Grid>
                  <Grid item>
                    {/* <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */} </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={8}></Box>
          </div>
        </Grid>
        <Grid item
          xs={6}>
          <div className="box">
            <table>
              <tbody>{adminInfoList.length > 0 && adminInfoList.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <div className={
                              classes.submit4
                            }>{
                          data.loginId
                        }</div>
                        <div className="group_Left">
                          <Button type="submit" size="small" variant="contained" color="primary"
                            className={
                              classes.submit2
                            }
                            onClick={
                              () => {
                                onClickButton(i)
                              }
                          }>선택</Button>

                          <Button size="small" variant="contained" color="primary"
                            className={
                              classes.submit3
                            }
                            onClick={
                              () => {
                                onClickRemoveButton(i)
                              }
                          }>삭제</Button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              }</tbody>
            </table>
          </div>
        </Grid>
      </Grid>