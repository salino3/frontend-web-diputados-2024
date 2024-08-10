import React, { useEffect, useRef, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import SearchIcon from "@mui/icons-material/Search";
import { CustomInputText, InputRange } from "./components";
import CancelIcon from "@mui/icons-material/Cancel";
import "./table.styles.scss";

interface TableProps {
  totalData: number;
  columns: any[];
  row: any[];
  uniqueKey?: string;
  page?: number;
  pageSize?: number;
  setFlag?: React.Dispatch<React.SetStateAction<boolean>>;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  rowPerPages?: number[];
}

interface TypesFilter {
  text: string;
  number: string;
  select: string;
  date: string;
  multiselect: string;
  range: string;
}

export const typesFilter: TypesFilter = {
  text: "text",
  number: "number",
  select: "select",
  date: "date",
  multiselect: "multiselect",
  range: "range",
};

export const TableComponet: React.FC<TableProps> = ({
  totalData = 0,
  columns,
  row,
  uniqueKey,
  page = 1,
  pageSize = 10,
  setFlag,
  setPage,
  setPageSize,
  rowPerPages = [5, 10, 25, 50],
}) => {
  // const keysToFilter = row.map((r, index) => r?.key || index);
  const keysToFilter = row.map((r) => r.key);

  const popupRefs = useRef<any[]>([]);

  const [filtersTable, setFiltersTable] = useState<any>(
    row.map((r, index) => {
      return {
        key: index,
        filter: r.filter,
        setFilter: r.setFilter,
        typeFilter: r.typeFilter || "text",
        open: false,
      };
    })
  );

  const valuesArray =
    columns &&
    columns?.length > 0 &&
    columns.map((column) => {
      const values: any = {};
      keysToFilter.forEach((key) => {
        values[key] = column[key] || "";
      });
      return values;
    });

  const totalPages: number = Math.ceil(totalData / pageSize);
  console.log(totalPages);
  const startRow = (page - 1) * pageSize + 1;
  const endRow = Math.min(page * pageSize, totalData);

  //
  const toggleFilterOpen = (index: number) => {
    setFiltersTable((prevFilters: any[]) => {
      if (!Array.isArray(prevFilters)) {
        return prevFilters;
      }
      return prevFilters.map((filter: any, i: number) =>
        i === index ? { ...filter, open: !filter.open } : filter
      );
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("here3", filtersTable);
    // Update the filters in the parent component
    filtersTable.forEach((filter: any) => {
      if (filter?.setFilter) {
        filter?.setFilter(filter.filter);
      }
    });
    setPage && setPage(1);
    setFlag && setFlag((prev) => !prev);
  };

  // Version 2
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | any,
    index: number,
    inputIndex?: number
  ) => {
    const { value } = event.target;
    setFiltersTable((prevFilters: any) =>
      prevFilters.map((filter: any, i: number) => {
        if (i === index) {
          if (filter.typeFilter === "range" || filter.typeFilter === "date") {
            const newValue = {
              ...filter.filter,
              [inputIndex === 0 ? "min" : "max"]: value,
            };
            return { ...filter, filter: newValue };
          }
          return { ...filter, filter: value };
        }
        return filter;
      })
    );
  };

  const handleMultiselectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    setFiltersTable((prevFilters: any[]) =>
      prevFilters.map((filter, i) => {
        if (i === index) {
          const updatedFilter = { ...filter };
          let currentFilters = updatedFilter.filter;

          selectedOptions.forEach((option: string) => {
            const index = currentFilters.indexOf(option);
            if (index !== -1) {
              currentFilters = currentFilters.filter(
                (item: string) => item !== option
              );
            } else {
              currentFilters = [...currentFilters, option];
            }
          });

          updatedFilter.filter = currentFilters;

          return updatedFilter;
        }
        return filter;
      })
    );
  };

  const handleReset = (index: number) => {
    setFiltersTable((prevFilters: any[]) =>
      prevFilters.map((filter: any, i: number) =>
        i === index ? { ...filter, filter: "" } : filter
      )
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      popupRefs.current.forEach((ref, index) => {
        if (ref && !ref.contains(event.target as Node)) {
          setFiltersTable((prevFilters: any[]) => {
            return prevFilters.map((filter: any, i: number) =>
              i === index ? { ...filter, open: false } : filter
            );
          });
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="table_x02_rootTableComponet">
      <div className="table_x02_containerTable">
        <span className="table_x02_totalResults">
          Total results: {totalData || "No data"}
        </span>
        <table className="table">
          <thead>
            <tr>
              {row &&
                row.length > 0 &&
                row.map((r, index) => (
                  <th
                    key={uniqueKey && r[uniqueKey] ? r[uniqueKey] : index}
                    scope="col"
                    className={`table_x02_thHeader  table_x02_${r?.title}_${
                      uniqueKey && r[uniqueKey] ? r[uniqueKey] : index
                    }`}
                  >
                    {/* start Filter Pop up */}
                    {r?.typeFilter && filtersTable[index]?.open && (
                      <div
                        className="table_x02_containerFormFilter"
                        ref={(el) => (popupRefs.current[index] = el)}
                      >
                        <form onSubmit={handleSubmit} id="table_x02_formFilter">
                          <span onClick={() => toggleFilterOpen(index)}>
                            <CancelIcon
                              style={{
                                color: "var(--color-two)",
                              }}
                            />
                          </span>

                          {r?.typeFilter == "range" ||
                          r?.typeFilter == "date" ? (
                            <InputRange
                              handleChange={(event, inputIndex) =>
                                handleChange(event, index, inputIndex)
                              }
                              maxDate={r?.maxDate}
                              minDate={r?.minDate}
                              lbl={r?.typeFilter === "date" ? null : r?.title}
                              Styles="table_x02_inputFilter"
                              type={r?.typeFilter || "text"}
                              inputValue={filtersTable[index]?.filter}
                              name={r?.title}
                            />
                          ) : (
                            <CustomInputText
                              valuesFilter={r?.valuesFilter || []}
                              handleChange={(event: any) =>
                                r?.typeFilter === "multiselect"
                                  ? handleMultiselectChange(event, index)
                                  : handleChange(event, index)
                              }
                              lbl={r?.typeFilter == "date" ? null : r?.title}
                              Styles="table_x02_inputFilter"
                              type={r?.typeFilter || "text"}
                              inputValue={filtersTable[index]?.filter}
                              name={r?.title}
                            />
                          )}
                          <div className="table_x02_btnsContainer">
                            <button
                              type="submit"
                              className="btn btn-primary table_x02_btnFilter"
                            >
                              Confirm
                            </button>
                            <button
                              type="reset"
                              onClick={() => handleReset(index)}
                              className="btn btn-secondary table_x02_btnFilter"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                    {/* end Filter Pop up */}
                    <span className="table_x02_spanTitleIcon">
                      {r?.title}

                      {r?.typeFilter && (
                        <SearchIcon
                          className="table_x02_iconSearchIcon"
                          onClick={() => toggleFilterOpen(index)}
                          style={{
                            cursor: "pointer",
                            color: filtersTable[index]?.filter
                              ? "var(--color-one)"
                              : "",
                          }}
                        />
                      )}
                    </span>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {valuesArray &&
              valuesArray?.length > 0 &&
              valuesArray.map((values, rowIndex) => (
                <tr
                  key={
                    uniqueKey && values[uniqueKey]
                      ? values[uniqueKey]
                      : rowIndex
                  }
                  className={`table_x02_trTable`}
                >
                  {keysToFilter &&
                    keysToFilter?.length > 0 &&
                    keysToFilter.map((key, colIndex) => {
                      const rowConfig = row.find((r) => r.key === key);
                      const content =
                        rowConfig && rowConfig.render
                          ? rowConfig.render(values[key], values)
                          : values[key];
                      const tooltip =
                        rowConfig && rowConfig.tooltip
                          ? rowConfig.tooltip(values[key], values)
                          : null;

                      return (
                        <td
                          key={`${key}_${
                            uniqueKey && values[uniqueKey]
                              ? values[uniqueKey]
                              : rowIndex
                          }_${colIndex}`}
                          className={`table_x02_${key}_${
                            uniqueKey && values[uniqueKey]
                              ? values[uniqueKey]
                              : rowIndex
                          }_${colIndex}`}
                          style={{
                            width: key == "Contenido" ? "400px" : "",
                            wordBreak:
                              key == "Contenido" ? "break-all" : "unset",
                          }}
                        >
                          {key && tooltip && (
                            <span
                              className={`${
                                key == "Contenido" && "table_x02_spanTooltip"
                              }`}
                            >
                              {tooltip}
                            </span>
                          )}
                          {content}
                        </td>
                      );
                    })}
                </tr>
                //
              ))}
          </tbody>
        </table>
        <div className="table_x02_rootPagination">
          <div className="table_x02_containerPagination">
            <div className="table_x02_contentChoosePages">
              <div className="table_x02_containerSpanRowsInfo">
                <span className="table_x02_spanChoosePages_01">
                  Rows per page:
                </span>
                <span className="table_x02_spanChoosePages_02">{pageSize}</span>
              </div>
              <details
                id="detailsPagesTable"
                className="table_x02_detailsPages"
              >
                <summary></summary>
                <div
                  id="containerPagesTable"
                  className="table_x02_containerPages"
                >
                  {rowPerPages &&
                    rowPerPages?.length > 0 &&
                    rowPerPages.map((item: number) => (
                      <span
                        onClick={() => {
                          setPageSize && setPageSize(item);
                          setPage && setPage(1);
                        }}
                        key={item}
                        className="table_x02_rowPages"
                      >
                        {item}
                      </span>
                    ))}
                </div>
              </details>
            </div>
            <div className="table_x02_contentArrows">
              <KeyboardDoubleArrowLeftIcon
                style={{
                  cursor: page == 1 ? "" : "pointer",
                  opacity: page == 1 ? "0.4" : "1",
                }}
                onClick={() => setPage && setPage(1)}
                className="table_x02_iconPagination"
              />
              <KeyboardArrowLeftIcon
                style={{
                  cursor: page == 1 ? "" : "pointer",
                  opacity: page == 1 ? "0.4" : "1",
                }}
                onClick={() => setPage && setPage(page == 1 ? page : page - 1)}
                className="table_x02_iconPagination"
              />
              <div className="table_x02_infoPagination">
                {startRow} - {endRow}
              </div>
              <KeyboardArrowRightIcon
                style={{
                  cursor: page == totalPages ? "" : "pointer",
                  opacity: page == totalPages ? "0.4" : "1",
                }}
                onClick={() =>
                  setPage && setPage(page == totalPages ? totalPages : page + 1)
                }
                className="table_x02_iconPagination"
              />
              <KeyboardDoubleArrowRightIcon
                style={{
                  cursor: page == totalPages ? "" : "pointer",
                  opacity: page == totalPages ? "0.4" : "1",
                }}
                onClick={() => setPage && setPage(totalPages)}
                className="table_x02_iconPagination"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
