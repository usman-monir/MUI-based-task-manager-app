import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

import TaskService from "../services/taskService";
import { Button, Checkbox } from "@mui/material";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const TaskDataGrid = () => {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    console.log(rowData);
    const fetchTasks = async () => {
      const response = await TaskService.fetchTasks();
      if (response.success) {
        setRowData(response.data);
      }
    };

    fetchTasks();
  }, []);

  const columnDefs = [
    { headerName: "Title", field: "title", editable: true },
    { headerName: "Description", field: "description", editable: true },
    {
      headerName: "Completed",
      field: "completed",
      cellRenderer: (params) => (
        <Checkbox
          checked={params.data.completed}
          onChange={() => handleCheckboxChange(params.data._id, params.data)}
        />
      ),
      editable: true,
    },
    {
      headerName: "Actions",
      field: "_id",
      cellRenderer: (params) => {
        return (
          <>
            <Button color="error" onClick={() => handleDelete(params.data._id)}>
              Delete
            </Button>
            <Button color="warning" onClick={() => handleEdit(params.data._id)}>
              Edit
            </Button>
          </>
        );
      },
    },
  ];

  const handleDelete = async (taskId) => {
    const response = await TaskService.deleteTask(taskId);
    if (response.success) {
      setRowData(rowData.filter((task) => task._id !== taskId));
    }
  };

  const handleEdit = async (taskId) => {
    navigate(`/tasks/${taskId}/edit?redirect=dashboard`);
  };

  const handleCheckboxChange = async (taskId, taskData) => {
    const response = await TaskService.updateTask(taskId, {
      ...taskData,
      completed: !taskData.completed,
    });
    if (response?.success) {
      setRowData(
        rowData.map((task) =>
          task._id === taskId
            ? { ...task, completed: !taskData.completed }
            : task
        )
      );
    }
  };

  return (
    <div className="ag-theme-quartz-dark" style={{ height: 400, width: 900 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{ sortable: true, filter: true }}
        rowSelection="multiple"
        suppressRowClickSelection={true}
        pagination={true}
        paginationPageSize={4}
        paginationPageSizeSelector={[4, 8, 12]}
      />
    </div>
  );
};

export default TaskDataGrid;
