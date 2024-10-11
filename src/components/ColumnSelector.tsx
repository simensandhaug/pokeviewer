import React from 'react';
import { FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';

interface ColumnSelectorProps {
  columns: string[];
  visibleColumns: string[];
  onToggle: (column: string) => void;
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({
  columns,
  visibleColumns,
  onToggle,
}) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Toggle Columns:
      </Typography>
      <FormGroup row>
        {columns.map((column) => (
          <FormControlLabel
            key={column}
            control={
              <Checkbox
                checked={visibleColumns.includes(column)}
                onChange={() => onToggle(column)}
                name={column}
              />
            }
            label={column}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default ColumnSelector;