-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema proy_tesis
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema proy_tesis
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `proy_tesis3` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `proy_tesis3` ;

-- -----------------------------------------------------
-- Table `proy_tesis`.`tb_mantto_prev`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proy_tesis3`.`tb_mantto_prev` (
  `id_prev` INT NOT NULL AUTO_INCREMENT,
  `cc_linea` SMALLINT NOT NULL,
  `date_start` DATETIME NOT NULL,
  `date_end` DATETIME NOT NULL,
  PRIMARY KEY (`id_prev`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `proy_tesis`.`tb_lineas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proy_tesis3`.`tb_lineas` (
  `cc_linea` INT NOT NULL,
  `nombre_linea` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`cc_linea`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `proy_tesis`.`tb_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proy_tesis3`.`tb_items` (
  `cod_item` VARCHAR(10) NOT NULL,
  `nombre_item` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`cod_item`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `proy_tesis`.`tb_meta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proy_tesis3`.`tb_meta` (
  `meta` INT NOT NULL,
  `id_meta` INT NOT NULL,
  `fk_cc_linea` INT NOT NULL,
  `fk_cod_item` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id_meta`, `fk_cc_linea`, `fk_cod_item`),
  INDEX `fk_meta_lineas1_idx` (`fk_cc_linea` ASC) VISIBLE,
  INDEX `fk_meta_items1_idx` (`fk_cod_item` ASC) VISIBLE,
  CONSTRAINT `fk_meta_lineas1`
    FOREIGN KEY (`fk_cc_linea`)
    REFERENCES `proy_tesis`.`tb_lineas` (`cc_linea`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_meta_items1`
    FOREIGN KEY (`fk_cod_item`)
    REFERENCES `proy_tesis`.`tb_items` (`cod_item`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `proy_tesis`.`tb_planeacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proy_tesis3`.`tb_planeacion` (
  `id_plan` INT NOT NULL AUTO_INCREMENT,
  `cant_plan` INT NOT NULL,
  `units_cant_plan` VARCHAR(4) NOT NULL,
  `date_start` DATE NULL,
  `date_end` DATE NULL,
  `mantto_prev_id_prev` INT NOT NULL,
  `meta_id_meta` INT NOT NULL,
  `fkmeta_cc_linea` INT NOT NULL,
  `fkmeta_cod_item` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id_plan`, `mantto_prev_id_prev`, `meta_id_meta`, `fkmeta_cc_linea`, `fkmeta_cod_item`),
  INDEX `fk_planeacion_mantto_prev1_idx` (`mantto_prev_id_prev` ASC) VISIBLE,
  INDEX `fk_planeacion_meta1_idx` (`meta_id_meta` ASC, `fkmeta_cc_linea` ASC, `fkmeta_cod_item` ASC) VISIBLE,
  CONSTRAINT `fk_planeacion_mantto_prev1`
    FOREIGN KEY (`mantto_prev_id_prev`)
    REFERENCES `proy_tesis`.`tb_mantto_prev` (`id_prev`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_planeacion_meta1`
    FOREIGN KEY (`meta_id_meta` , `fkmeta_cc_linea` , `fkmeta_cod_item`)
    REFERENCES `proy_tesis`.`tb_meta` (`id_meta` , `fk_cc_linea` , `fk_cod_item`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `proy_tesis`.`tb_orden_prod`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proy_tesis3`.`tb_orden_prod` (
  `num_orden` SMALLINT NOT NULL AUTO_INCREMENT,
  `fecha_orden` DATE NOT NULL,
  `cod_mat_prima` SMALLINT NOT NULL,
  `mat_prima_desc` VARCHAR(100) NOT NULL,
  `cant_mat_prima_kg` SMALLINT NOT NULL,
  `cod_suministro` SMALLINT NOT NULL,
  `suministro_desc` VARCHAR(100) NOT NULL,
  `cant_suministro_und` SMALLINT NOT NULL,
  `persons_amount` SMALLINT NULL DEFAULT NULL,
  `cod_molde` SMALLINT NULL DEFAULT NULL,
  `tb_planeacion_id_plan` INT NOT NULL,
  `tb_planeacion_mantto_prev_id_prev` INT NOT NULL,
  `tb_planeacion_meta_id_meta` INT NOT NULL,
  `tb_planeacion_fkmeta_cc_linea` INT NOT NULL,
  `tb_planeacion_fkmeta_cod_item` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`num_orden`, `tb_planeacion_id_plan`, `tb_planeacion_mantto_prev_id_prev`, `tb_planeacion_meta_id_meta`, `tb_planeacion_fkmeta_cc_linea`, `tb_planeacion_fkmeta_cod_item`),
  INDEX `fk_tb_orden_prod_tb_planeacion1_idx` (`tb_planeacion_id_plan` ASC, `tb_planeacion_mantto_prev_id_prev` ASC, `tb_planeacion_meta_id_meta` ASC, `tb_planeacion_fkmeta_cc_linea` ASC, `tb_planeacion_fkmeta_cod_item` ASC) VISIBLE,
  CONSTRAINT `fk_tb_orden_prod_tb_planeacion1`
    FOREIGN KEY (`tb_planeacion_id_plan` , `tb_planeacion_mantto_prev_id_prev` , `tb_planeacion_meta_id_meta` , `tb_planeacion_fkmeta_cc_linea` , `tb_planeacion_fkmeta_cod_item`)
    REFERENCES `proy_tesis`.`tb_planeacion` (`id_plan` , `mantto_prev_id_prev` , `meta_id_meta` , `fkmeta_cc_linea` , `fkmeta_cod_item`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `proy_tesis`.`tb_usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proy_tesis3`.`tb_usuarios` (
  `cod_user` SMALLINT NOT NULL,
  `user_name` VARCHAR(50) NOT NULL,
  `type_user` VARCHAR(10) NOT NULL,
  `pass` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`cod_user`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `proy_tesis`.`tb_infor_op`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proy_tesis3`.`tb_infor_op` (
  `num_infor` INT NOT NULL AUTO_INCREMENT,
  `person_name_ay` VARCHAR(50) NOT NULL,
  `person2_name_ay` VARCHAR(50) NULL DEFAULT NULL,
  `und_ok` SMALLINT NOT NULL,
  `scrap` SMALLINT NOT NULL,
  `orden_prod_num_orden` SMALLINT NOT NULL,
  `orden_prod_planeacion_id_plan` INT NOT NULL,
  `op_fkmeta_cc_linea` INT NOT NULL,
  `op_fkmeta_cod_item` VARCHAR(10) NOT NULL,
  `fk_cod_user` SMALLINT NOT NULL,
  PRIMARY KEY (`num_infor`, `fk_cod_user`),
  INDEX `fk_infor_op_orden_prod1_idx` (`orden_prod_num_orden` ASC, `orden_prod_planeacion_id_plan` ASC, `op_fkmeta_cc_linea` ASC, `op_fkmeta_cod_item` ASC) VISIBLE,
  INDEX `fk_infor_op_usuarios1_idx` (`fk_cod_user` ASC) VISIBLE,
  CONSTRAINT `fk_infor_op_orden_prod1`
    FOREIGN KEY (`orden_prod_num_orden`)
    REFERENCES `proy_tesis`.`tb_orden_prod` (`num_orden`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_infor_op_usuarios1`
    FOREIGN KEY (`fk_cod_user`)
    REFERENCES `proy_tesis`.`tb_usuarios` (`cod_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `proy_tesis`.`tb_time_paralizaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proy_tesis3`.`tb_time_paralizaciones` (
  `id_time_par` INT NOT NULL,
  `fecha` DATE NOT NULL,
  `cod_stop_1` SMALLINT NULL DEFAULT NULL,
  `time1_start` TIME NULL DEFAULT NULL,
  `time1_end` TIME NULL DEFAULT NULL,
  `cod_stop_2` SMALLINT NULL DEFAULT NULL,
  `time2_start` TIME NULL DEFAULT NULL,
  `time2_end` TIME NULL DEFAULT NULL,
  PRIMARY KEY (`id_time_par`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `proy_tesis`.`tb_mantto_correctivos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proy_tesis3`.`tb_mantto_correctivos` (
  `cc_linea` SMALLINT NOT NULL,
  `danio_desc` VARCHAR(200) NOT NULL,
  `type_danio` ENUM('Eléctrico', 'Mecánico') NOT NULL,
  `id_correctivo` INT NOT NULL,
  PRIMARY KEY (`id_correctivo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `proy_tesis`.`tb_paralizaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proy_tesis3`.`tb_paralizaciones` (
  `tipo_paro` VARCHAR(50) NOT NULL,
  `cod_paro` INT NOT NULL,
  `desc_paro` VARCHAR(100) NULL DEFAULT NULL,
  `infor_op_num_infor` INT NOT NULL,
  `op_fk_cod_user` SMALLINT NOT NULL,
  `fk_id_time_par` INT NOT NULL,
  `fk_id_correctivo` INT NOT NULL,
  PRIMARY KEY (`cod_paro`, `infor_op_num_infor`, `op_fk_cod_user`, `fk_id_time_par`, `fk_id_correctivo`),
  INDEX `fk_cod_paralizaciones_infor_op1_idx` (`infor_op_num_infor` ASC, `op_fk_cod_user` ASC) VISIBLE,
  INDEX `fk_cod_paralizaciones_time_paralizaciones1_idx` (`fk_id_time_par` ASC) VISIBLE,
  INDEX `fk_tb_paralizaciones_tb_mantto_correctivos1_idx` (`fk_id_correctivo` ASC) VISIBLE,
  CONSTRAINT `fk_cod_paralizaciones_infor_op1`
    FOREIGN KEY (`infor_op_num_infor` , `op_fk_cod_user`)
    REFERENCES `proy_tesis`.`tb_infor_op` (`num_infor` , `fk_cod_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cod_paralizaciones_time_paralizaciones1`
    FOREIGN KEY (`fk_id_time_par`)
    REFERENCES `proy_tesis`.`tb_time_paralizaciones` (`id_time_par`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_paralizaciones_tb_mantto_correctivos1`
    FOREIGN KEY (`fk_id_correctivo`)
    REFERENCES `proy_tesis`.`tb_mantto_correctivos` (`id_correctivo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
