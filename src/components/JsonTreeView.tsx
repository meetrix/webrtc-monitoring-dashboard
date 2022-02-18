import React from 'react';
import { v4 } from 'uuid';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import debugLib from 'debug';

const debug = debugLib('Logger');
debug.enabled = true;

const getRowsFromObject = (treeItem: any) => {
  return (
    <TreeView
      key={v4()}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {Object.entries(treeItem).map(([treeItemRowKey, treeItemRowValue]) => {
        let children;
        let treeItemRowlabel;
        if (treeItemRowKey === 'sdp' && typeof treeItemRowValue === 'string') {
          treeItemRowValue = treeItemRowValue.split('\r\n');
        }
        if (
          Array.isArray(treeItemRowValue) &&
          treeItemRowValue[0] instanceof Object
        ) {
          children = getObjectsRowsFromArray(treeItemRowValue);
          treeItemRowlabel = treeItemRowKey;
        } else if (
          treeItemRowValue instanceof Object ||
          Array.isArray(treeItemRowValue)
        ) {
          children = getRowsFromObject(treeItemRowValue);
          treeItemRowlabel = treeItemRowKey;
        } else {
          treeItemRowlabel = `${treeItemRowKey} : ${treeItemRowValue}`;
        }
        return (
          <TreeItem
            key={v4()}
            nodeId={v4()}
            label={treeItemRowlabel}
            children={children}
          />
        );
      })}
    </TreeView>
  );
};

const getObjectsRowsFromArray = (treeItems: any) => {
  return treeItems.map((treeItem: any) => {
    return getRowsFromObject(treeItem);
  });
};

interface JsonTreeViewProps {
  treeItems: any;
}

const JsonTreeView: React.FC<JsonTreeViewProps> = ({
  treeItems,
}: JsonTreeViewProps) => {
  return (
    <TreeView
      key={v4()}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {treeItems instanceof Object ? getRowsFromObject(treeItems) : treeItems}
    </TreeView>
  );
};

export default JsonTreeView;
