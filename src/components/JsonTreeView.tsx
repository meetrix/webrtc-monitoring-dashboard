import React from 'react';
// import { v4 } from 'uuid';
const v4 = require('uuid');
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import debugLib from 'debug';
const debugLib = require('debug');

const debug = debugLib('Logger');
debug.enabled = true;

interface JsonTreeViewProps {
  treeItems: any;
}

const JsonTreeView: React.FC<JsonTreeViewProps> = ({
  treeItems,
}: JsonTreeViewProps) => {
  const [expanded, setExpanded] = React.useState([]);

  const handleToggle = (event: any, nodeIds: any) => {
    // debug(nodeIds);
    setExpanded(nodeIds);
  };

  const getRowsFromObject = (treeItem: any, parentLabel: string) => {
    return (
      <TreeView
        key={v4()}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        onNodeToggle={handleToggle}
      >
        {Object.entries(treeItem).map(([treeItemRowKey, treeItemRowValue]) => {
          let children;
          let treeItemRowlabel;
          if (
            treeItemRowKey === 'sdp' &&
            typeof treeItemRowValue === 'string'
          ) {
            treeItemRowValue = treeItemRowValue.split('\r\n');
          }
          if (
            Array.isArray(treeItemRowValue) &&
            treeItemRowValue[0] instanceof Object
          ) {
            children = getObjectsRowsFromArray(
              treeItemRowValue,
              treeItemRowKey
            );
            treeItemRowlabel = treeItemRowKey;
          } else if (
            treeItemRowValue instanceof Object ||
            Array.isArray(treeItemRowValue)
          ) {
            children = getRowsFromObject(treeItemRowValue, treeItemRowKey);
            treeItemRowlabel = treeItemRowKey;
          } else {
            treeItemRowlabel = `${treeItemRowKey} : ${treeItemRowValue}`;
          }
          return (
            <TreeItem
              key={`${parentLabel}/${treeItemRowlabel}`}
              nodeId={`${parentLabel}/${treeItemRowlabel}`}
              label={treeItemRowlabel}
              children={children}
            />
          );
        })}
      </TreeView>
    );
  };

  const getObjectsRowsFromArray = (
    treeItemsArray: any,
    parentLabel: string
  ) => {
    return treeItemsArray.map((treeItem: any) => {
      return getRowsFromObject(treeItem, parentLabel);
    });
  };

  return (
    <TreeView
      key={v4()}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {treeItems instanceof Object
        ? getRowsFromObject(treeItems, 'init')
        : treeItems}
    </TreeView>
  );
};

export default JsonTreeView;
