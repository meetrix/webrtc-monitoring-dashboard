import React from 'react';
import { v4 } from 'uuid';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import debugLib from 'debug';

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
    console.log(nodeIds);
    setExpanded(nodeIds);
  };

  const getRowsFromObject = (treeItem: any) => {
    return (
      <TreeView
        key={JSON.stringify(treeItem)}
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
              key={JSON.stringify(treeItem) + treeItemRowlabel}
              nodeId={JSON.stringify(treeItem) + treeItemRowlabel}
              label={treeItemRowlabel}
              children={children}
            />
          );
        })}
      </TreeView>
    );
  };

  const getObjectsRowsFromArray = (treeItemsArray: any) => {
    return treeItemsArray.map((treeItem: any) => {
      return getRowsFromObject(treeItem);
    });
  };

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
