import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Particle from "../components/partials/Particle";

const API_URL = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({
    title: "",
    category: "",
    level: "",
    imageFile: null,
  });
  const [editSkill, setEditSkill] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/skills/`);

        if (response.status < 200 || response.status >= 300) {
          throw new Error(
            `Error HTTP: ${response.status} ${response.statusText}`
          );
        }

        setSkills(response.data.skills);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setSkills([]);
      }
    };
    fetchSkills();
  }, []);

  const addSkill = async (e) => {
    if (!newSkill.title || !newSkill.category || !newSkill.level) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", newSkill.title);
    formData.append("category", newSkill.category);
    formData.append("level", newSkill.level);
    if (newSkill.imageFile) {
      formData.append("imageFile", newSkill.imageFile);
    }
    try {
      const response = await axios.post(
        `${API_URL}/api/skills/addSkill`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSkills([...skills, response.data]);
      const reloadedSkills = await axios.get(`${API_URL}/api/skills/`);
      setSkills(reloadedSkills.data.skills);

      setNewSkill({
        title: "",
        category: "",
        level: "",
        imageFile: null,
      });
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  const updateSkill = async (e) => {
    if (!editSkill.title || !editSkill.category || !editSkill.level) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", editSkill.title);
    formData.append("category", editSkill.category);
    formData.append("level", editSkill.level);

    // Ajouter l'image si elle a été modifiée
    if (editSkill.imageFile) {
      formData.append("imageFile", editSkill.imageFile);
    }
    // Ajouter l'ancien public_id dans le FormData si nécessaire
    if (editSkill.public_id) {
      formData.append("public_id", editSkill.public_id);
    }

    try {
      const response = await axios.put(
        `${API_URL}/api/skills/${editSkill._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedSkills = skills.map((skill) =>
        skill._id === response.data.skill._id ? response.data.skill : skill
      );
      setSkills(updatedSkills);
      setEditSkill(null);
    } catch (error) {
      console.error("Error updating skill:", error);
    }
  };

  const deleteSkill = async (skillId) => {
    try {
      await axios.delete(`${API_URL}/api/skills/${skillId}`);
      setSkills(skills.filter((skill) => skill._id !== skillId));
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  return (
    <div className="container mt-5">
      <Particle />
      <h2 className="text-center mb-4 text-white">Dashboard</h2>
      {/* Form to add a new skill */}
      <div
        className="card p-4 mb-4 shadow-sm mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <h3>Ajouter une compétence</h3>
        <div className="row">
          <div className="col-12">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Titre"
              value={newSkill.title}
              onChange={(e) =>
                setNewSkill({ ...newSkill, title: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Catégorie"
              value={newSkill.category}
              onChange={(e) =>
                setNewSkill({ ...newSkill, category: e.target.value })
              }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <select
              className="form-select mb-3"
              value={newSkill.level}
              onChange={(e) =>
                setNewSkill({ ...newSkill, level: e.target.value })
              }
            >
              <option value="">Sélectionnez un niveau</option>
              <option value="Beginner">Débutant</option>
              <option value="Intermediate">Intermédiaire</option>
              <option value="Advanced">Expert</option>
            </select>
          </div>
          <div className="col-12">
            <input
              type="file"
              className="form-control mb-3"
              onChange={(e) =>
                setNewSkill({ ...newSkill, imageFile: e.target.files[0] })
              }
            />
          </div>
        </div>
        <button className="btn btn-primary w-100" onClick={addSkill}>
          Ajouter
        </button>
      </div>

      {/* List of skills */}
      <h3 className="text-white">Liste des compétences</h3>
      <ul className="list-group">
        {skills.map((skill) => (
          <li
            key={skill._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {editSkill && editSkill._id === skill._id ? (
              <>
                <div className="row">
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={editSkill.title}
                      onChange={(e) =>
                        setEditSkill({ ...editSkill, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={editSkill.category}
                      onChange={(e) =>
                        setEditSkill({
                          ...editSkill,
                          category: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <select
                      className="form-select mb-2"
                      value={editSkill.level}
                      onChange={(e) =>
                        setEditSkill({ ...editSkill, level: e.target.value })
                      }
                    >
                      <option value="Débutant">Débutant</option>
                      <option value="Intermédiaire">Intermédiaire</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <input
                      type="file"
                      className="form-control mb-2"
                      onChange={(e) =>
                        setEditSkill({
                          ...editSkill,
                          imageFile: e.target.files[0],
                        })
                      }
                    />
                  </div>
                </div>
                <button className="btn btn-success me-2" onClick={updateSkill}>
                  Enregistrer
                </button>
                <button
                  className="btn btn-secondary "
                  onClick={() => setEditSkill(null)}
                >
                  Annuler
                </button>
              </>
            ) : (
              <>
                <img
                  src={`${skill.urlImage}`}
                  alt={skill.title}
                  width="50"
                  className="me-3"
                />
                <div>
                  <p className="mb-1">
                    <strong>{skill.title}</strong> - {skill.category} (
                    {skill.level})
                  </p>
                </div>
                <div>
                  <button
                    className="btn btn-warning me-2 w-100"
                    onClick={() => setEditSkill(skill)}
                  >
                    Modifier
                  </button>
                  <button
                    className="btn btn-danger w-100"
                    onClick={() => deleteSkill(skill._id)}
                  >
                    Supprimer
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
