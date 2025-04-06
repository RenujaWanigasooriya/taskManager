package com.taskManager.taskManager.repository;

import com.taskManager.taskManager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}