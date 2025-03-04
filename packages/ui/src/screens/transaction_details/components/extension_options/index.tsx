import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import useAppTranslation from '@/hooks/useAppTranslation';
import { ChangeEvent, FC, LegacyRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ListChildComponentProps, VariableSizeList as List } from 'react-window';
import useStyles from '@/screens/transaction_details/components/messages/styles';
import { useList, useListRow } from '@/hooks/use_react_window';
import { getMessageByType } from '@/components/msg/utils';
import Box from '@/components/box';
import { extensionOptionToMessage } from './util';

type ListItemProps = Pick<ListChildComponentProps, 'index' | 'style'> & {
  setRowHeight: Parameters<typeof useListRow>[1];
  extensionOption: unknown;
  classes: ReturnType<typeof useStyles>['classes'];
  isLast: boolean;
  viewRaw: boolean;
};

const ListItem: FC<ListItemProps> = ({
  index,
  style,
  setRowHeight,
  extensionOption,
  classes,
  isLast,
  viewRaw,
}) => {
  const { t } = useAppTranslation('transactions');
  const { rowRef } = useListRow(index, setRowHeight);
  const componentMessage = extensionOptionToMessage(extensionOption);
  const formattedItem = getMessageByType(componentMessage, viewRaw, t);

  return (
    <div style={style}>
      <div ref={rowRef}>
        <div className={classes.item}>
          <div className={classes.tags}>{formattedItem.type}</div>
          <span className="msg">{formattedItem.message}</span>
        </div>
        {!isLast && <Divider />}
      </div>
    </div>
  );
};

type ExtensionOptionsProps = {
  className?: string;
  extension_options: null | unknown[];
  viewRaw: boolean;
  toggleExtensionOptionsDisplay: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

const ExtensionOptions: FC<ExtensionOptionsProps> = ({ className, ...props }) => {
  const { classes, cx } = useStyles();
  const { t } = useAppTranslation('transactions');
  const { listRef, getRowHeight, setRowHeight } = useList();
  return (
    <Box className={cx(classes.root, className)}>
      <div className={classes.header}>
        <div className={classes.mobileOptions}>
          <Typography variant="h2">{t('extension_options')}</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={props.viewRaw}
                onChange={props.toggleExtensionOptionsDisplay}
                color="primary"
              />
            }
            label={t('raw')}
          />
        </div>
        <div className={classes.desktopOptions}>
          <FormControlLabel
            control={
              <Switch
                checked={props.viewRaw}
                onChange={props.toggleExtensionOptionsDisplay}
                color="primary"
              />
            }
            label={t('raw')}
          />
        </div>
      </div>
      <Divider />
      <div className={classes.list}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              className="List"
              height={height ?? 0}
              itemCount={props.extension_options.count}
              itemSize={getRowHeight}
              ref={listRef as LegacyRef<List>}
              width={width ?? 0}
            >
              {({ index, style }) => (
                <ListItem
                  key={index}
                  index={index}
                  style={style}
                  setRowHeight={setRowHeight}
                  extensionOption={props.extension_options.items[index]}
                  classes={classes}
                  isLast={index === props.extension_options.count}
                  viewRaw={props.viewRaw}
                />
              )}
            </List>
          )}
        </AutoSizer>
      </div>
    </Box>
  );
};

export default ExtensionOptions;
