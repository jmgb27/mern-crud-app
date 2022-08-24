import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Form } from "../src/vite-env";

export default function Create() {
    const [resStat, setResStat] = useState<number | undefined>(0);
    const [err, errCatch] = useState<any[]>([]);

    const [form, setForm] = useState<Form>({
        name: "",
        position: "",
        level: "",
    });
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value: Form) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    async function onSubmit(
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.FormEvent<HTMLFormElement>
    ): Promise<void> {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { ...form };

        await fetch(`${import.meta.env.VITE_URL}/record/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
            .catch((error) => {
                window.alert(error);
                return;
            })
            .then((res) => {
                setResStat(res?.status);
                return res?.json();
            })
            .then((data) => {
                errCatch(data);
            });

        setForm({ name: "", position: "", level: "" });
    }

    // {
    //     resStat === 200 ? navigate("/") : null;
    // }

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <h3>Create New Record</h3>
            {err.map((x: string) => {
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
                    <label htmlFor="name">Name</label>
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
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="position">Position</label>
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
                        />
                        <label
                            htmlFor="positionSenior"
                            className="form-check-label"
                        >
                            Senior
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create person"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}
