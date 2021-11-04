import React from "react";
import { Button, Grid, Header, Icon } from "semantic-ui-react";

const ButtonArea = props => {
  const { onClick } = props;
  return (
    <Grid>
      <Grid.Column floated="left" width={5} verticalAlign="middle">
        <Button id="btnExit" onClick={(event, data) => onClick(event, data)}>
          <Icon name="arrow left" />
          나가기
        </Button>
      </Grid.Column>
      <Grid.Column textAlign="right" floated="right" width={5}>
        <Button
          id="btnSaveTmp"
          secondary
          onClick={(event, data) => onClick(event, data)}
        >
          임시저장
        </Button>
        <Button
          id="btnSave"
          primary
          onClick={(event, data) => onClick(event, data)}
        >
          출간하기
        </Button>
      </Grid.Column>
    </Grid>
  );
};

export default ButtonArea;
