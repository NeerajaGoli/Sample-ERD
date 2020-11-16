import * as React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Box} from "@material-ui/core";
import { useERD, getSchema } from "./hook";
import { CanvasWidget } from "@projectstorm/react-canvas-core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
    },
  })
);
interface IERDView {}

const ERDView: React.FC<IERDView> = () => {
  const classes = useStyles();
  const { engine } = useERD(getSchema());

  return (
    <Box>
      {engine && (
        <>
          <CanvasWidget className={classes.root} engine={engine} />
        </>
      )}
    </Box>
  );
};

export default React.memo(ERDView);
