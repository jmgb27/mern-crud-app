import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Form } from "../src/vite-env";

export default function Edit() {
    const [form, setForm] = useState<Form>({
        name: "",
        position: "",
        level: "",
        records: [],
    });

    const params = useParams();
    const navigate = useNavigate();

    //handle json response status
    const [resStat, setResStat] = useState<number | undefined>(0);

    //handle json response
    const [jRes, setjRes] = useState<any[]>([]);

    //this state will enable or disable input while fetching the data
    const [isDisabled, setDisStatus] = useState<boolean>(true);

    useEffect(() => {
        async function fetchData() {
            const id = params.id?.toString();
            const response = await fetch(
                `${import.meta.env.VITE_URL}/record/${params.id?.toString()}`
            );

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${id} not found`);
                navigate("/");
                return;
            }

            setForm(record);

            //This will then now enable the input since we already fetch the data
            setDisStatus(false);
        }

        fetchData();
        return;
    }, [params.id, navigate]);

    // These methods will update the state properties.
    function updateForm(value: Form) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.FormEvent<HTMLFormElement>
    ): Promise<void> {
        e.preventDefault();

        const editedPerson = {
            name: form.name,
            position: form.position,
            level: form.level,
        };

        // This will send a post request to update the data in the database.
        await fetch(`${import.meta.env.VITE_URL}/update/${params.id}`, {
            method: "POST",
            body: JSON.stringify(editedPerson),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                setResStat(res.status);
                return res.json();
            })
            .then((data) => {
                setjRes(data);
            });
    }
    {
        resStat === 200 ? navigate("/") : null;
    }
    // This following section will display the form that takes input from the user to update the data.
    return (
        <div>
            <h3>Update Record</h3>
            {jRes.map((x: string) => {
                return resStat === 200 ? (
                    <div className="alert alert-success" role="alert">
                        {x}
                    </div>
                ) : (
                    <div className="alert alert-danger" role="alert">
                        {x}
                    </div>
                );
            })}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) =>
                            updateForm({
                                name: e.target.value,
                            })
                        }
                        disabled={isDisabled}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="position">Position: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="position"
                        value={form.position}
                        onChange={(e) =>
                            updateForm({
                                position: e.target.value,
                            })
                        }
                        disabled={isDisabled}
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionIntern"
                            value="Intern"
                            checked={form.level === "Intern"}
                            onChange={(e) =>
                                updateForm({
                                    level: e.target.value,
                                })
                            }
                            disabled={isDisabled}
                        />
                        <label
                            htmlFor="positionIntern"
                            className="form-check-label"
                        >
                            Intern
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionJunior"
                            value="Junior"
                            checked={form.level === "Junior"}
                            onChange={(e) =>
                                updateForm({
                                    level: e.target.value,
                                })
                            }
                            disabled={isDisabled}
                        />
                        <label
                            htmlFor="positionJunior"
                            className="form-check-label"
                        >
                            Junior
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionSenior"
                            value="Senior"
                            checked={form.level === "Senior"}
                            onChange={(e) =>
                                updateForm({
                                    level: e.target.value,
                                })
                            }
                            disabled={isDisabled}
                        />
                        <label
                            htmlFor="positionSenior"
                            className="form-check-label"
                        >
                            Senior
                        </label>
                    </div>
                </div>
                <br />

                <div className="form-group">
                    <input
                        type="submit"
                        value="Update Record"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}
